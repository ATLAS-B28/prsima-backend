const prsima =  require('../prsima/index')

//create post
const createPost = async (req,res,next)=>{
   try {
    //we need to grab body ,title ,slug and authorId
    //authorId will automatically refernced to id of the user
    const {slug,title,body,authorId} = req.body
    if(!slug ||!title ||!body ||!authorId){
    throw new Error('Slug/title/body/authorId is not there')

    }
    const result = await prsima.post.create({
        data:{
            slug,
            title,
            body,
            author:{connect:{id:authorId}}
        }
      })
      res.json(result)
   } catch (error) {
    throw new Error(`${error}`)
   }
}
const updatePost = async (req,res,next)=>{
    //find the id from params 
    const {id} = req.params
    //then get the title and body
    const {title,body} = req.body
    try {
        const result = await prsima.post.update({
           //find the unique id and get updated 
           //the title and body
            where:{
                id
            },
            data: {
                title,
                body
            }
        })
        //res of the result
        res.json(result)
    } catch (error) {
        res.json({error:`Post with ${id} does not exist`})
    }
}
const deletePost = async (req,res,next)=>{
    //get the id from params
    const {id} = req.params
    try {
        const result = await prsima.post.delete({
            where:{
                id
            }
        })
        res.json(result)
    } catch (error) {
        res.json({error:`No post was found with ${id}`})
    }
}
const getPosts = async (req,res,next)=>{
    try {
        const result = await prsima.post.findMany()
        res.json(result)
    } catch (error) {
        res.json({error:'no post was found'})
    }
}
module.exports={createPost,updatePost,deletePost,getPosts}