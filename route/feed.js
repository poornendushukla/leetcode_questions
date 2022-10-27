const express = require('express')
const path = require('path')
const {body} = require('express-validator')
const {v4:uuidV4} = require('uuid') 
const router = express.Router()
const feedController = require('../controller/feedController')
const isAuth = require('../middleware/is-auth')


// GET all the questions 
router.get('/posts',feedController.getPosts)
//GET a post 
router.get('/post/:postId',feedController.getPost)
//Post new question
router.post('/posts',isAuth,feedController.createPost)
module.exports = router
