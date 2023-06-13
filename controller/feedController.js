const {validationResult} = require('express-validator');
const path = require('path');
const Question = require('../model/question')
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

exports.updatePost = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('validation Failed')
        error.statusCode = 502
        throw error
    }   
    const {postId}=req.params
    const {link,difficulty,comment,solution,tag} = req.body
    Question.findById(postId)
    .then(question=>{
        if(!question){
            const error = new Error("could not find question ")
            error.statusCode = 404
            throw error
        }
        if(question.creator.toString()!==req.userId){
            const error = new Error("not authorized to edit this post")
            error.statusCode = 403
            throw error
        }
        question.Link = link | question.Link
        question.Comment = comment | question.Comment
        question.Solution = solution | question.Solution 
        question.Tag = tag | question.Tag
        question.Difficulty = difficulty | question.Difficulty
        return question.save()
    }).then(result=>{
        res.status(200).json({message:"updated Successfully",question:result})
    })
    .catch(error=>{
        if(!error.statusCode)
            error.statusCode = 500
        next(error)
    })
}
exports.deletePost = (req,res,next)=>{
    const {postId} = req.params
    Question.findById(postId)
    .then(post=>{
        if(!post){
            const error = new Error('not found')
            error.statusCode = 404
            throw error;
        }
        if(post.Creator.toString()!==req.userId){
            console.log(req.userId,'  ',post.Creator.toString())
            const error = new Error('not Authorized')
            error.statusCode = 403
            throw error
        }
       return Question.findByIdAndRemove(postId)
    }).then(result=>{
        return User.findById(req.userId)
    }).then(user=>{
        user.posts.pull(postId)
        return user.save()
    }).then(result=>{
        res.status(200).json({message:'post deleted succesfully',post:result})
    })
    .catch(err=>{
        if(!err.statusCode)
            err.statusCode = 500
        next(err)
    })
}