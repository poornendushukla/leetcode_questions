const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    Tag:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true,
    },
    Link:{
        type:String,
        required:true
    },
    isDraft:{
        type:Boolean,
        default:true,
        required:true
    },
    Comment:{
        type:String,
        required:true
    },
    Solution:{
        type:String,
        required:true
    },
    creator:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('question',questionSchema,'question')