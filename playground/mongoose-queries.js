// Here we study different queries in Mongoose to query the MongoDB database.

const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// To tweak ID, I simply incremented the first number by 1. So, 5 changes to 6.
// This was done to simulate an error in the ID, to test the code below.
var id = '5c79704251577c0500ca434d1'; // Taken from database, using Robo3T

// Here to use the find method, which is thenable (see chapter 75) and we also enforce
// that we want only those todos which has a specific id. Note, when we used the native
// mongodb syntax to query the database, we had to convert the id string to ObjectId, 
// since the id is a hexadecimal number. Here, Mongoose does this for us, so we just use
// the string. Cool! Note, we shall get back an array of documents.
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ', todos);
// }).catch((error) => {
//     console.log('Error: ', error);
// });

// Here we find just one document that matches the criteria - here the matching id. Use
// this, if we want to find one document by something other than ID. 
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo: ', todo);
// }).catch((error) => {
//     console.log('Error: ', error);
// });

// Find a document by Id. We just pass the id as an argument. We do not need to create a query 
// object and we do not have to set _id: id. Cool! Use this to find one document by ID.
if (!ObjectID.isValid(id)) {
    console.log('ID not Valid');
}
Todo.findById(id).then((todo) => {
    if (todo === null) {
        return console.log('ID not Found');
    }
    console.log('Todo: ', todo);
}).catch((error) => {
    console.log('Error: ', error);
});