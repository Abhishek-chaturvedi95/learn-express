const mongoose = require('mongoose')

//7 . Here, we're constructing a schema with mongoose.Schema
//and define the fields as well as the data types.
const schema = mongoose.Schema({
    title : String,
    content : String,
})

//8 . Then, we create a new model by using the mongoose.model based on the schema that we've just created.
module.exports = mongoose.model("Post" , schema)

//6 . In NoSQL world, every single data stored inside a single document. And multiple documents with the same type can be put together inside a collection.
//Model is a class, that lets us interact with a specific collection of a database.
//Defining a model also requires us to define a schema.
//Schema is basically tells the model how our document should look like.

//Let's say we have a blog API. So, we obviously going to have a Post model.
//And the post model has a schema that contains the fields that can be added into a single document. 
//For this example, we will simply have a title and content field.


//9 . Get all posts - create routes.js