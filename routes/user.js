const express = require('express');
const router=express.Router();
const {protect} =require('../middlewares/auth');
const {signup,login,forgotpassword,resetpassword,getdata}=require('../controllers/user');



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

router
.route('/getdata')
.get(protect,getdata);

module.exports=router;