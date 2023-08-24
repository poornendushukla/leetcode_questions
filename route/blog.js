const express = require('express')
const router  = express.Router();
const blogController = require('../controller/blogController')
const {body} = require('express-validator')
const User = require('../model/user')

// getting all the personal blog
router.get('/blogs',blogController.getBlogs)
// getting blog based on id
router.get('/blogs:blogId',blogController.getBlog)
// postin blog
router.post('/create',blogController.createBlog)
//comment to blog
router.post('/comment',blogController.commentBlog)

module.exports = router