const {validationResult} = require('express-validator');
const path = require('path');
const Question = require('../model/question')
const User = require('../model/user')
const Blog = require('../model/blog')
exports.getBlogs = (req,res,next)=>{
    Blog.find().then(blogs=>{
        res.status(200).json({blogs:blogs,message:'blogs fetched'})
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getBlog = (req,res,next)=>{
    const {blogId} =req.params;
    Blog.findById(blogId).then(blog=>{
        if(!blog){
            const error = new Error('Could not find the blog.')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({blog})
    }).catch(err=>{
        if(!err.statusCode) 
        err.statusCode = 500
    next(err)
    })
}

exports.createBlog = (req,res,next)=>{
    const {title,content,tags} =req.body;
    const blog = new Blog({
        title:title,
        content:content,
        tags:[...tags],
    })
    blog.save().then(result=>{
        res.status(201).json({message:'Blog was created successfully',blog:blog})
    }).catch(err=>{
        if(!err.statusCode)
            err.statusCode=500
        next(err)
    })
}

exports.commentBlog = (req,res,next)=>{
   const {blogId,content,commentTag} = req.body;
   Blog.findById(blogId).then(blog=>{
    if(!blog){
        const error = new Error("could not find question ")
        error.statusCode = 404
        throw error
    }
    blog.comments.push({content:content,commentTag:[...commentTag]})
    return blog.save()
   }).then(result=>{
      res.status(201).json({message:'comment success',comment:{content,commentTag,data:Date.now()}})
   }).catch(err=>{
      if(!err.statusCode){
        err.statusCode = 500
      }
      next(err)
   })
}