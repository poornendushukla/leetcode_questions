const express = require('express')
const router  = express.Router();
const AuthController = require('../controller/authController')
const {body} = require('express-validator')
const User = require('../model/user')

//Login
router.post("/login",AuthController.login)

//signup
router.put("/signup",[
    body('email').isEmail().withMessage("please enter a valid email ")
                .normalizeEmail()
                .custom((value,{req})=>{
                    console.log(req.body)
                    return User.findOne({email:value}).then(user=>{
                        if(user)
                            return Promise.reject("Email already exists")
                    })
                }),
    body('password').trim().isLength({min:5}),
    body('name').trim().not().isEmpty()
],AuthController.signUp)

module.exports = router