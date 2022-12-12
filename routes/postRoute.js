const express = require('express')
const router = express.Router()
//first look for the logged in 
const isLoggedIn = require('../middleware/loginStatus')
const {createPost,updatePost,deletePost,getPosts} = require('../controllers/postController')
router.route('/post/create').post(isLoggedIn,createPost)
router.route('/post/update/:id').put(isLoggedIn,updatePost)
router.route('/post/delete/:id').delete(isLoggedIn,deletePost)
router.route('/post/get').get(isLoggedIn,getPosts)
module.exports = router