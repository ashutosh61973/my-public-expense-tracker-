const mongoose = require('mongoose');

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
module.exports=mongoose.model('Transaction', TransactionSchema);




// user:{
//     type: 'string'
// }
// email:{

// }
// password :{

// }
// transactionArr:[
//     {
//         text:{
//             type: 'string',
//             trim: true,
//             required: [true,'please add text']
//         },
//         amount:{
//             type:'number',
//             required: [true,'amount must be a number']
//         },
//         createdAt:{
//             type:Date,
//             default: Date.now()
//         }
    
//     }
// ]