const User = require('../models/User');
const ErrorResponse=require('../utils/errorResponse');
const sendEmail=require('../utils/sendEmail');
const crypto=require('crypto');
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
      
        const userdoc=await usertemp.save();

        // const alluser= await User.find();
          
        // anothe mehod to do that ->i.e create ->actually it do both operation above in sigle command User.create({object})
        // const user=await User.create({
        //     username: username,
        //     email: email,
        //     password: password,
        //     // transactions:[transaction]
        // });
        sendToken(userdoc,201,res);
        // res.status(200).json({
        //     success: true,
        //     user:userdoc,
        // })

    } catch (error) {
       next(error);
        // res.status(500).json({
        //     succes:false,
        //     error:error.message
        // });
    }

    
    // res.send('i am sign up');
}



// endpoint =api/v1/user/login 
//method post 
// do log in
exports.login = async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({
            succes:false,
            error:"please provide a valid email and password "
        })
    }
    try {
        
        const user = await User.findOne({email}).select('+password');
        if(!user)
        {
            //checking email
            res.status(404).json({
                succes:false,
                error:"invalid email ans password"
            })
        } 

        //checking password
        const isMatch= await user.matchPasswords(password).catch(e => { console.log(e) });

        if(!isMatch)
        {
            res.status(404).json({
                success:false,
                error:"wrong password"
            });
        }

        //if both email and password is matched then send back response 
        sendToken(user,200,res);
        // res.status(200).json({
        //     success:true,
        //     user: user,
        //     token:"tr34f3443fc"
        // });

    } catch (error) {
        console.log("something went wrong");
    }


    // res.send('iam login');
}


// endpoint =api/v1/user/forgetpassword
//method
// do password
exports.forgotpassword=async (req,res,next)=>{ 


    const {email}=req.body;

    try{
        const user=await User.findOne({email});
        if(!user)
        {
            return next(new ErrorResponse("Email could not be found",404));
        }
        // console.log(user);
        /************************************ */

        const resetToken = crypto.randomBytes(20).toString("hex");
        // Hash token (private key) and save to database
        const resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

        // Set token expire date
        const resetPasswordExpire = Date.now() + 3600000 // 1hour 
         user.resetPasswordToken=resetPasswordToken;
         user.resetPasswordExpire=resetPasswordExpire;

        /***************************************/
        // const resetToken = user.getResetPasswordToken();
        
        console.log(resetToken);
        // user.resetPasswordToken=resetToken;
        await user.save({ validateBeforeSave: false});


                // Create reset url to email to provided email
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        // HTML Message
        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        try {
             sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message,
            });

            res.status(200).json({ success: true, data: "Email Sent" });
        } 
        catch (err) {
            console.log(err);

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500));
        }


    } catch (err) {
        next(err);
    }

    // res.send("i am forgot password")

}

exports.resetpassword=async (req,res,next)=>{ 

    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

    // console.log("req",req);
    console.log("=============================================================");
    // console.log("resetPasswordToken",resetPasswordToken);
    try {
        const user=await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt: Date.now()}
        })
        console.log(user);
        if(!user) {
            return next(new ErrorResponse("INVALID RESET TOKEN",400));
        }

        user.password=req.body.password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save(); 

        res.status(201).json({
            success: true,
            data:"password reset successfully"
        })

    } catch (error) {
        next(error);
    }

    // res.send("i am reset password")

}


exports.getdata=(req,res,next)=>{
    const userdata=req.user;
    res.status(200).json({
        success:true,
        user:userdata,
        transactions:userdata.transactions
    });
};

const sendToken = function(user,statusCode,res){
    const token =user.getSignedToken();
    res.status(statusCode).json({
        success:true,
        token:token,
        user
    })
};