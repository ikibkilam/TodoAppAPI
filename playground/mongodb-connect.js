// Object destructuring example implementation in ES6.
var user = {
    name: 'Biki',
    age: '56'
}
// The old fashioned way.
var nameO = user.name;
console.log(nameO);
// The ES6 way - object destructuring.
var {name} = user;
console.log(name);

// We shall use destructuring to rewrite the statement below. Note, I have commented it out as well.
// const MongoClient = require('mongoDB').MongoClient;
// The below creates a variable MongoClient that is the same as the property MongoClient of mongodb.
// Why do this, when the above commented statement was good enough. Well, we can now add additional
// properties we want to pull out, that are variables with the same name as the property. For example,
// we pulled out ObjectID. This is a constructor function for creating new ids. And we can use 
// anywhere to create new ids.
const {MongoClient, ObjectID} = require('mongodb')
// Now we can create a new objectif using the above constructor.
var obj = new ObjectID();
console.log(obj);

// Connect to mongodb.
MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB database server');
    }
    console.log('Connected to MongoDB database server');

    // Get a reference to the TodoApp database.
    const db = client.db('TodoApp');

    // Insert a document into the Users collection.
    db.collection('Users').insertOne({
        name: 'Biki',
        age: 56,
        location: 'Mercer Island'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert into Users', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
        // Result.ops is an array of all documents that got inserted. So, for the first document we can access 
        // that document with result.ops[0]. Then we can get the id with result.ops[0]._id. And then we can use
        // the method getTimestamp on this object to get the timestamp. This will print the timestamp part of
        // the id. 
        console.log(result.ops[0]._id.getTimestamp());
    });


    client.close();
});