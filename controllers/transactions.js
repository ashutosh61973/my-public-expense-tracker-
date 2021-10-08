const Transaction =require('../models/Transaction');
const User = require('../models/User');
const db=require('../config/db');

// 1.  get all transactions 
// 2.  route = (GET method) => /api/routes/transactions

exports.getTransactions= async (req, res, next) => {

    try {

        // const transactions= await Transaction.find();
        const authuser=req.user;
        const transactions=authuser.transactions;
        return res.status(200).json({
            success: true,
            count:transactions.length,
            data:transactions,
            username:req.user.username, 
            email:req.user.email
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'server Error'
        });
    }
    // res.send('GET TRANSACTIONS');
}



// 1.  Add all transactions 
// 2.  route = (POST method) => /api/routes/transactions
exports.addTransactions= async (req, res, next) => {
 try {
    const {text,amount} = req.body; 
    // const transaction=await Transaction.create({text:text,amount:amount} );
    
    await User.updateOne(
        { _id: req.user._id },
        { $addToSet: { transactions: req.body } }
    );
    
    
    
    // User.findOne({'email':req.user.email}).then(function(record){
    //     record.transactions.push({text,amount});
    //     record.save().then(function(){console.log("saved to mongodb")});
    // });
    
     const transaction={text:text,amount:amount};
    
    //  user.transactions.push(transaction);
    //  user.markModified('transactions');
   
    // const userData=await user.save(); 
    
    const user=await User.findById(req.user._id);
    return res.status(201).json({
        success:true,
        data: transaction,
        userData: user,
        transactions:user.transactions
    });
 }
 catch (err) {
     if(err.name==="ValidationError")
     {
        const message = Object.values(err.errors).map(val=>val.message);
        return res.status(400).json({
            success:false,
            error:message
        })
     }
     else{
         res.status(500).json({
            success:false,
            error:"Server Error"
         });
     }
    
 }
    // res.send('ADD TRANSACTIONS');
}



// 1.  Delete  transactions 
// 2.  route = (DELETE method) => /api/routes/transactions/:id
exports.deleteTransactions= async(req, res, next) => {

    try {
        
        // const transaction = await Transaction.findById(req.params.id);
        let transaction=await User.findOne({
            'transactions._id':req.params.id,
        });
        if(!transaction)
        {
            return res.status.json({
                success:false,
                error:"Transaction not found."
            });

        }
        let transactions_array=transaction.transactions;
        let user_transaction_deleted=transactions_array.find((val)=>{if(val===req.params.id)return true});

        let transactions_deleted =await User.updateOne(
            { _id: req.user._id },
            { $pull: { transactions : { _id: req.params.id } } },
            { multi: true }
        );

        return res.status(200).json({
            success:true,
            data:transaction,
            data_deleted:user_transaction_deleted
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            error:"Server Error"
         });
    }

    // res.send('DELETE TRANSACTIONS');
}



//all functions that are relate to this  (route = (GET method) => /api/routes/transactions)