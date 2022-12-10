//to signup the user
//bring prisma and cookie
const { user } = require('../prsima/index')
const prisma = require('../prsima/index')
const cookieToken = require('../utils/cookie')
//user signup
const signup = async (req,res,next)=>{
  // 
  try {
    const {name,email,password} = req.body
    //check 
    if(!name || !email || !password){
        throw new Error('Please provide all fields')
    }
    //using prsima create a user object
    const user = await prisma.user.create({
        data:{
            //as the fields and the inputs are of same name
            name,
            email,
            password,
        }
    })
    //user is the param for the cookietoken func
    //so send a cookie
    cookieToken(user,res)
  } catch (error) {
    throw new Error('Error occured in signup') 
  }
  
}
//login user
const login = async (req,res,next)=>{
  try {
    const {email,password} = req.body
    //check
    if(!email || !password){
      throw new Error('Please provide email and password')
    }
    const getUser = await prisma.user.findUnique({
      where: {//jsut like in sql
        email
      }
      //no user found
     
    })
    if (!getUser){
      throw new Error('No user found')
    }
    //password miss match
    if (getUser.password !== password){
      throw new Error('Password is in correct')
    }
    cookieToken(getUser,res)
  } catch (error) {
    throw new Error('error occured in login')
  }
}
//logout 
const logout = async (req,res,next)=>{
  try {
    res.clearCookie('token')//finds the cookie in the browser
    res.status(200).json({success:true})//for the frontend
  } catch (error) {
    throw new Error('Error occured during logout')
  }
}
module.exports = {signup,login,logout}