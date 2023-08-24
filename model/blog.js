const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title:{
        type:String,
        default:()=>`Daily Updates ${Date.now}`
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    tags:{
        type:[String],
        default:['untagged']
    },
    comments:[{
        content:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now()
        },
        commentTag:{
            type:[String],
            default:['untagged']
        }

    }]
});

const Blog = mongoose.model('Blog',blogSchema)
module.exports = Blog