//1 . We first import our express package that we've just installed. 
const express = require('express')

//4 . Here, we're importing mongoose package and use it to connect into our database
//Mongoose is the most preferred MongoDB wrapper for Node.js. It allows us to interact with MongoDB database with ease.
//We can start connecting our server into our MongoDB database.
const mongoose = require('mongoose')

//10. we import the ./routes.js file to get all the routes
const routes = require('./routes')

//5 . connect into our database called MYdb
//If you haven't created that database, don't worry, mongoose will create it for ya.
//The connect method returns a promise, so we can wait until it resolved, and run our Express server.
mongoose.connect("mongodb://localhost:27017/myDB" , {useNewUrlParser: true})
        .then(() => {
            //2 . create a new express instance and put it into app variable
            //This app variable let us do everything we need to configure our REST API, like registering our routes, installing necessary middlewares, and much more.
            const app = express()

            //17. adding the middleware
            app.use(express.json())

            //10. register it with app.use method with the prefix of /api, So, all of our posts can be accessed in /api/posts.
            app.use("/api" , routes)
            
            //3 . Make sure the express instance listens on port 5000
            app.listen(5000 , () => {
                console.log("Server has started")
            })
        })


//6 . Mongoose model(Post.js creation)
//let's add a new folder in our project called models, and create a file called Post.js inside it.
