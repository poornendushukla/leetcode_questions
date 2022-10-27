const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const token = req?.get('Authorization')?.split(' ')?.[1]
    let decodedToken
    console.log("coming here")
    try{
        decodedToken = jwt.verify(token,'longsecret')
    }catch(err){
        err.statusCode = 500
        throw err
    }
    if(!decodedToken){
        const error = new Error("Not Authenticated")
        error.statusCode = 401
        throw error
    }
    req.userId  = decodedToken.userId
    next()
}