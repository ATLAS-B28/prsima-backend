//checks whether we are logged in or not
const prsima = require('../prsima/index')
const jwt = require('jsonwebtoken')
const isLoggedIn = async (req,res,next)=>{
    try {
        //verify the token
        const token = req.cookie.tokens
        if(!token){
            res.send('Please Login')
            throw new Error('You are not logged in')
        }
        //if token present
        //so decode it 
        //use jwt secert
        const decodeToken = jwt.verify(token,process.env.JWT_SEC)
        //then take the payload of name and everything 
        //check whether the user exits or not
        req.user = await prsima.user.findUnique({
            where:{
                id:decodeToken.userId //this comes from getjwt.js 
            }
        })
        next()
    } catch (error) {
        throw new Error(`${error}`)
    }
}
module.exports = isLoggedIn