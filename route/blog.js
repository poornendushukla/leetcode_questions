const express = require('express')
const router  = express.Router();
const AuthController = require('../controller/authController')
const {body} = require('express-validator')
const User = require('../model/user')

// getting all the personal blog
router.get('/blogs')
// getting blog based on id
router.get('/blogs:blogId')
// postin blog
router.post('/blog')