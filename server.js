const morgan      =require('morgan')
const bodyParser  =require('body-parser')
const express=require('express');
const app=express();


const authRoute =require('./Routes/Auth')
require('./config/connexions');


app.use(express.json());
 







app.listen(3001,()=>{

    console.log('server runing ');

});

app.use('/api',authRoute)