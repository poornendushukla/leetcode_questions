const {validationResult} = require('express-validator');
const path = require('path');
const Question  = require('../model/Question')


exports.getPosts = (req,res,next)=>{
    Question.find().then(posts=>{
        res.status(200).json({posts:posts,message:'fetched Successfully'})
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getPost = (req,res,next)=>{
    const {postId} = req.params
    Question.findById(postId).then(post=>{
        console.log(postId)
        if(!post){
            const error = new Error('Could not find the post.')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({message:'Post fetched',post:post})
    }).catch(err=>{
        if(!err.statusCode) 
            err.statusCode = 500
        next(err)
    })
}

exports.createPost = (req,res,next)=>{
    const {link,description,tag,difficulty,isDraft,comment,solution,creator} = req.body
    const post = new Question({
        tag,
        description,
        link,
        isDraft,
        comment,
        solution,
        creator
    })
    post.save().then(result=>{
        
    })
}