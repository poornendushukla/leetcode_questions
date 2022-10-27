const User = require('../model/user')
const bcrypt = require('bcryptjs')
const validationResult = require('express-validator')
const jwt = require('jsonwebtoken')

exports.signUp = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.empty()){
        const error = new Error("Validation Result")
        error.statusCode = 422
        error.data = errors
        throw error
    }
    const {email,password,name} = req.body
    console.log("email",email)
    bcrypt.hash(password,12)
        .then(hashedPwd=>{
            const user = new User({
                email:email,
                password:hashedPwd,
                name:name
            })
            return user.save()
        }).then(result=>{
            res.status(201).json({message:'User Created',userId:result._id})
        }).catch(err=>{
            if(!err.statusCode)
                err.statusCode = 500
            next(err) 
        })
}