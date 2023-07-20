const morgan      =require('morgan')
const bodyParser  =require('body-parser')
const express=require('express');
const app=express();
require('./config/connexions');



const authRoute =require('./Routes/Auth')
const profileEdit =require('./Routes/profileEdit')


app.use(express.json());
 


app.use('/api',authRoute)
app.use('/user',profileEdit)




app.listen(3001,()=>{console.log('server runing ');});

