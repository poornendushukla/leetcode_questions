const {validationResult} = require('express-validator');
const path = require('path');
const Question  = require('../model/Question')
const User = require('../model/user')

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
    const {link,description,tag,difficulty,isDraft,comment,solution} = req.body
    let creator;
    const post = new Question({
        Tag:tag,
        Description:description,
        Link:link,
        isDraft,
        Comment:comment,
        Difficulty:difficulty,
        Solution:solution,
        Creator:req.userId
    })
    console.log(req.userId)
    post.save().then(result=>{
        return User.findById(req.userId)
    }).then(user=>{
        creator = user
        console.log(user)
        user.posts.push(post)
        return user.save()
    }).then(result=>{
        res.status(201).json({message:'Post was created',post:result,creator:{_id:creator._id,name:creator.name}})
    }).catch(err=>{
        if(!err.statusCode)
            err.statusCode = 500
        next(err)
    })
}