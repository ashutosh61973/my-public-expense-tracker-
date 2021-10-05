const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const TransactionSchema = new mongoose.Schema({
    text:{
        type: 'string',
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
        type:'string',
        required:[true,'please provide a username']
    },
    email:{
        type:'string',
        required:[true,'please provide a email'],
        unique:true,
        match :[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please add regular email"
        ]
    },
    password: {
        type:'string',
        minlength:6,
        required:[true,"please add a password"],
        select:false
    },
    resetPasswordToken:'string',
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

const User=mongoose.model("User",UserSchema);
module.exports = User;