const User = require('../models/User');

// endpoint =api/v1/user/signup 
//method post 
// do sign up
exports.signup = async (req,res,next)=>{
    
    const {username,email,password}=req.body;

    try {
        
        // const transaction = {
        //     text:"nll",
        //     amount:0
        // };
        const usertemp=new User({username: username, email: email,password: password});
       
        // usertemp.transactions.push(transaction);
      
        const doc=await usertemp.save();

        // const alluser= await User.find();

        // const user=await User.create({
        //     username: username,
        //     email: email,
        //     password: password,
        //     // transaction:[transaction]
        // });

        res.status(200).json({
            success: true,
            user:doc,
        })


    } catch (error) {
        res.status(500).json({
            succes:false,
            error:error.message
        });
    }

    
    // res.send('i am sign up');
}



// endpoint =api/v1/user/login 
//method post 
// do log in
exports.login = (req,res,next)=>{
    res.send('iam login');
}


// endpoint =api/v1/user/forgetpassword
//method
// do password
exports.forgotpassword=(req,res,next)=>{ 

    res.send("i am forgot password")

}

exports.resetpassword=(req,res,next)=>{ 

    res.send("i am reset password")

}

