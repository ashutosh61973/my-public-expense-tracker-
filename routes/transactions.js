const express = require('express');
const router = express.Router();
const {protect}=require('../middlewares/auth')
const {getTransactions,addTransactions,deleteTransactions} =require('../controllers/transactions');

 



router
.route('/')
.get(protect ,getTransactions)
.post(protect,addTransactions);


router
 .route('/:id')
 .delete(protect,deleteTransactions);


module.exports=router;
