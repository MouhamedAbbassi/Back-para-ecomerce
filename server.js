const morgan      =require('morgan')
const bodyParser  =require('body-parser')
const express=require('express');
const app=express();
require('./config/connexions');
const cookieParser = require("cookie-parser");
 



const authRoute =require('./Routes/Auth')
const profileEdit =require('./Routes/profileEdit')


app.use(express.json());
app.use(cookieParser());
 


app.use('/api',authRoute)
app.use('/user',profileEdit)
//app.get("/basic", userAuth, (req, res) => res.render("user"))





app.listen(3001,()=>{console.log('server runing ');});

