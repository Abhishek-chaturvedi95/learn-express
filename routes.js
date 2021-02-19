//9. This file contains express routes
//We also need to import express but this time, we want to use the express.Router
//It lets us register the routes and use it in our application (in index.js).
const express = require('express')

//9 . we're importing the Post model 
const Post = require("./models/Post")

const router = express.Router()

//10. Get all posts
//create a new GET route with router.get method
//This method will accept the endpoint of the route, and the route handler to define what data should be sent to the client.
//In this case, we're going to fetch all of our posts with the find from our model and send the result with res.send method.
//Because fetching documents from the database is asynchronous, we need to use await to wait until the operation is finished
//So, don't forget to tag your function as async. Then, after the data is completely fetched, we can send it to the client.
router.get("/posts" , async (req , res) => {
    const posts = await Post.find()
    res.send(posts)
})
//10. Now, we can install our routes in our index.js.

//18. Get individual post -> To grab the individual post, we need to create a new route with GET method.
//19 . Here, we're registering a new route with the endpoint of /posts/:id
//This is called the URL parameter, it lets us grab the id of our post in our route handler
//Because, every single document that we stored into our database has their own uniqe identifier called ObjectID
//And we can find it using the findOne method and pass the id from req.params object.

//20. now try to fetch a single blog post with our HTTP client.
//If we to the this route and pass the wrong ObjectID, our server is crashed. And the reason why its not working is because when we fetch a single post with an ObjectID that doesn't exist, the promise rejects and our application is stop working.
//To prevent this, we can wrap our code with try/catch block, so that we can send a custom error whenever the client request a data that doesn't exist.
router.get("/posts/:id" , async(req , res) => {
    try{
        const post = await Post.findOne({_id: req.params.id})
        res.send(post)
    }catch {
        res.status(404)
        res.send({error : "Post dosen't exist"})
    }
})

//11 . When we access localhost:5000/api/posts -> we got an empty array from our server. That's because we haven't create any post yet
//To create a post, we need to accept POST requests from /api/posts.
router.post("/posts" , async(req , res) => {

    //12 . creating a new Post object and populate the fields from the req.body property.
    //13 . The req object contains the client request data, and the body is one of them.

    const post = new Post({
        title : req.body.title,
        content : req.body.content,
    })
    //14 . Then, we also need to save our record with the save method. 
    //15 . Saving data is also asynchronous, so we need to use async/await syntax.
    await post.save()
    res.send(post)
})

// 21. "Update post" -> Usually, the preferred HTTP method to do an update operation into a single record is PATCH. So, let's create one!
//Our update post route relatively similar to the get single post route. 
//We're looking for a post by based on the id, and throw a custom error if the post doesn't exist. 
// But this time, we also update every single field of the post object by populating it with the data provided by the client inside the req.body.
//We also want to save our post object with save method, and send the update post data to the client.
router.patch("/posts/:id" , async(req , res) => {
    try{
        const post = await Post.findOne({_id:req.params.id})

        if(req.body.title){
            post.title = req.body.title
        }

        if(req.body.content){
            post.content = req.body.content
        }

        await post.save()
        res.send(post)
    }catch{
        res.status(404)
		res.send({ error: "Post doesn't exist!" })
    }
})

//22 . "DELETE Post" -> Finally, our last step is to finish the CRUD feature by add the delete functionality.
//In the delete post route, we basically just run the delete operation directly to the database with deleteOne method and pass the document id
//And we return nothing to the user.
router.delete("/posts/:id" , async(req , res) => {
    try{
        await Post.deleteOne({_id: req.params.id })
        req.status(204).send()
    }catch{
        res.status(404)
		res.send({ error: "Post doesn't exist!" })
    }
})



//Now, we can install our routes in our index.js.
module.exports = router

//16 . By default, Express doesn't know how to read the request body. So, we need to add a middleware to be able to parse them in every single request. 
//That way, our request body will be available in our route handlers via req.body.

//17 . Middle ware is added in index.js