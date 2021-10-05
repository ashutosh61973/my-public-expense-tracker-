const express = require('express');
const router=express.Router();

const {signup,login,forgotpassword,resetpassword}=require('../controllers/user');



router
.route('/signup')
.post(signup);


router
.route('/login')
.post(login); 


router
.route('/forgotpassword')
.post(forgotpassword); 


router
.route('/resetpassword/:resetToken')
.put(resetpassword); 

module.exports=router;