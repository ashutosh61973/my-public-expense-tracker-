const mongoose = require('mongoose');
const connectDB= async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            // useCreateIndex:true,
            useUnifiedTopology:true
        }); 
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
    }
    catch(err){
        console.log(`Error:${err.message}`.red.italic);
        process.exit(1);
    }
}
module.exports = connectDB;

// https://medium.com/@beaucarnes/learn-the-mern-stack-by-building-an-exercise-tracker-mern-tutorial-59c13c1237a1