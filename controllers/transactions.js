const Transaction =require('../models/Transaction');



// 1.  get all transactions 
// 2.  route = (GET method) => /api/routes/transactions

exports.getTransactions= async (req, res, next) => {

    try {

        const transactions= await Transaction.find();
        return res.status(200).json({
            success: true,
            count:transactions.length,
            data:transactions
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
    const transaction=await Transaction.create({text:text,amount:amount} );

    return res.status(201).json({
        success:true,
        data: transaction
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
        
        const transaction = await Transaction.findById(req.params.id);
        if(!transaction)
        {
            return res.status.json({
                success:false,
                error:"Transaction not found."
            });

        }
        await transaction.remove();
        return res.status(200).json({
            success:true,
            data:transaction
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