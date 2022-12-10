require('dotenv').config()
const express = require('express')
const cookie = require('cookie-parser')
const crypt = require('bcryptjs')
const userRouter= require('./routes/userRoute')
const app = express()
//writing middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//cookie middleware
//whenever we get a req. we will trap the cookies 
//and store the json token in this cookies
app.use(cookie())


//basic route
app.get('/',(req,res)=>{
    res.send('Welcome to Prsima connected backend')
})
//custom route
app.use('/api',userRouter)
//listening 
app.listen(3000,()=>{
    console.log('Server is on-the-grid at 3000...')
})