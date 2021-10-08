const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const TransactionSchema = new mongoose.Schema({
    text:{
        type: String,
        trim: true,
        required: [true,'please add text']
    },
    amount:{
        type:'number',
        required: [true,'amount must be a number']
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }

});


const UserSchema=new mongoose.Schema({
    
    username:{
        type:String,
        required:[true,'please provide a username']
    },
    email:{
        type:String,
        required:[true,'please provide a email'],
        unique:true,
        match :[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please add regular email"
        ]
    },
    password: {
        type:String,
        minlength:6,
        required:[true,"please add a password"],
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    
    transactions:[TransactionSchema]
});
UserSchema.pre("save",async function(req, res, next) {
    if(!this.isModified("password")){
        next();
    }
    const  salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt);
    next();
});
UserSchema.methods.matchPasswords = async function(passwords){

    try{
        const check= await bcrypt.compare(passwords,this.password);
        return check ;
    }catch(err){
        console.log(err.message);
    }

    // return await bcrypt.compare(passwords,this.password);

};

UserSchema.methods.getSignedToken= function(){
    return jwt.sign(
    {
        id : this._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn:process.env.JWT_EXPIRE
    });
};


UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  
    return resetToken;
};


const User=mongoose.model("User",UserSchema);
module.exports = User;