const User = require('../model/user')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.signUp = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error("Validation Result")
        error.statusCode = 422
        error.data = errors
        throw error
    }
    const {email,password,name} = req.body
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
            throw err 
        })
}

exports.login = (req,res,next)=>{
    const {email,password} = req.body
    let loadUser;
    User.findOne({email:email}).then(user=>{
        if(!user){
            const error = new Error("email or password is incorrect")
            error.statusCode = 401
            throw error
        }
        loadUser = user
        return bcrypt.compare(password,user.password)
    }).then(isEqual=>{
        if(!isEqual){
            const error = new Error("email or password is incorrect")
            error.statusCode = 401
            throw error
        }
        const token = jwt.sign({email:loadUser.email,userId:loadUser._id},'longsecret',{expiresIn:"1h"})
        res.status(200).json({token:token,userId:loadUser._id.toString()})

    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500
            next(err)
        }
    })
}