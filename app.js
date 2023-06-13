const path = require('path');
const fs = require('fs')
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express();
const feedRoutes = require('./route/feed')
const authRoutes = require('./route/auth')
const adminRoutes = require('./route/admin')
const morgan = require('morgan')

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

app.use(bodyParser.json())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    next();
})

app.use(morgan((tokens,req,res)=>{
    return [
        tokens.date(req,res),
        tokens['remote-user'](req,res),
        tokens['remote-addr'](req,res),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
      ].join('#')
},{stream:accessLogStream}))

app.use('/leetcode',feedRoutes)
app.use('/auth',authRoutes)
app.use('/admin',adminRoutes)
app.use((error,req,res,next)=>{
    const {statusCode,message,data} = error
    console.log(error)
    res.status(statusCode).json({message:message,data:data})
})
mongoose.connect('mongodb+srv://poornendu:iYsp8oSFV7tCCSmv@cluster0.gwipa.mongodb.net/Leetcode_Question?retryWrites=true&w=majority')
    .then(result=>{
        console.log("connected")
        app.listen(8081)
    })
    .catch(err=>console.log(err))