const jwt = require('jsonwebtoken')
//the userid is grabbed
const getJWT = (userId)=>{
  return jwt.sign({userId:userId},process.env.JWT_SEC,{expiresIn:'1 day'})
}
module.exports = getJWT