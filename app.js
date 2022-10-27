const path = require('path');
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express();
const feedRoutes = require('./route/feed')
const authRoutes = require('./route/auth')
app.use(bodyParser.json())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    next();
})
app.use('/leetcode',feedRoutes)
app.use('/auth',authRoutes)
app.use((error,req,res,next)=>{
    const {statusCode,message,data} = error
    console.log("error",statusCode)
    res.status(statusCode).json({message:message,data:data})
})
mongoose.connect('')
    .then(result=>{
        console.log("connected")
        app.listen(8081)
    })
    .catch(err=>console.log(err))