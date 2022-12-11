//main idea is we should be able to generate a token and 
//set it in the cookie 
const getJWT = require('../helpers/getjwt')
const cookieToken = (user,res)=>{
    //take the user
    const token  = getJWT(user.id)
    //prepare the options
    const options = {
        expires:new Date(Date.now() + 3 *24 * 60 *60 * 1000),
        httpOnly: true
    }
    //overwrite i.e to not send the user the password
    user.password = undefined
    //set the cookie
    res.status(200).cookie('token',token,options).json({
        //this is for the frontend to utilize it
        success:true,
        token,
        user
    })
}
module.exports = cookieToken