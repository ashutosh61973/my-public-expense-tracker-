const express=require('express');
const dotenv=require('dotenv');
const colors=require('colors');
const morgan=require('morgan');
const cors = require('cors');
const transactions=require('./routes/transactions');
const user=require('./routes/user');
const connectDB=require('./config/db');

dotenv.config({path: './config/config.env'});

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}


app.use('/api/v1/user',user);
app.use('/api/v1/transactions', transactions);  
app.get('/', (req,res)=>res.send('Hello ashu'));

const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`Server Running In ${process.env.NODE_ENV} mode on ${PORT}`.yellow.italic
));