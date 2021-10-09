const express=require('express');
const dotenv=require('dotenv');
const colors=require('colors');
const morgan=require('morgan');
const cors = require('cors');
const transactions=require('./routes/transactions');
const user=require('./routes/user');
const connectDB=require('./config/db');
const path = require('path');
const errorHandler=require('./middlewares/error');
dotenv.config({path: './config/config.env'});

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}


app.use('/api/user',user);
app.use('/api/v1/transactions', transactions);  
app.get('/', (req,res)=>res.send('Hello ashu'));

app.use(errorHandler);

     app.use(express.static(path.join(__dirname, 'build')));
  
    app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));
  

const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`Server Running In ${process.env.NODE_ENV} mode on ${PORT}`.yellow.italic
));
