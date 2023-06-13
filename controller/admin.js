const fs  = require('fs/promises')
const path = require('path')


exports.getLogs = async (req,res,next)=>{
  try {
        const data = await fs.readFile('access.log',{encoding:'utf-8'})
        const logsArray = data.split('\n')
        const result = {}
        logsArray.forEach(log=>{
          const indLog = log.split('#')
          const date = new Date(indLog[0])
          const dateString = `${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()}`
          const reqMethod = indLog[3]
          const reqUrl = indLog[4]
          const reqStatus = indLog[5]
          const reqContentLen = indLog[6]
          const resTime = indLog[7]
           result[dateString] ? result[dateString].push({date,reqMethod,reqUrl,reqStatus,resTime}) :result[dateString]=[{date,reqMethod,reqUrl,reqStatus,resTime}]
        })
        res.status(200).json({message:'read File',logs:result})

  }catch(error){
     if(!error.statusCode)
        error.statusCode = 500
    next(error)
  }

}