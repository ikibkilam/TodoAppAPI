// Use destructuring to get the MongoClient and ObjectID objects from the mongodb library.
const {MongoClient, ObjectID} = require('mongodb')

// Connect to mongodb.
MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB database server');
    }
    console.log('Connected to MongoDB database server');

    // Get a reference to the TodoApp database.
    const db = client.db('TodoApp');

    // findOneAndUpdate. This time I have used Promise. Also, I have used mongodb operator (this is documented)
    // in the generic mongodb docs, in the reference->operator section. So, these apply for any driver (not
    // just node.js). I again referred to the mongodb nodejs driver docs for the exact method usage - it takes
    // four arguments - filter object, update object, options object and a callback. If we do not use the callback
    // then we get a Promise back. I did not use a calllback, and it is time I learned to use a Promise! Note, in
    // the options object, I just used one parameter - returnOriginal, which defaults to true and returns the original
    // document. Note, the 'then' method returns a promise and takes two arguments - callback functions for handling
    // success and failure cases of the Promise. Note, the Promise object represents the eventual completion (or failure) 
    // of an asynchronous operation, and its resulting value.
    db.collection('Todos').findOneAndUpdate( {
        _id: new ObjectID('5c5c0dc33f8863f75334aa4f')
    }, { 
        $set: { completed: true } // set is the mongodb operator. We do need to use some operator to set value
    }, {
        returnOriginal: false // Returns the updated document and not the original document
    } ).then((successResult) => { // Function called if Promise is fulfilled. Function has one argument
        console.log(`${JSON.stringify(successResult, undefined, 2)}`);
        console.log(`The updated document`);
        console.log(`${JSON.stringify(successResult.value, undefined, 2)}`);
    }, (failResult) => { // Function called if Promise is not fulfilled. Function has one argument
        console.log('Failed to update the document');
    } );

    // Increment age value by 1 and change name to Biki.
    db.collection('Users').findOneAndUpdate( {
        _id: new ObjectID('5c5985626ebc50909cec1280')
    }, { 
        $inc: { age: 1 }, // inc is the mongodb operator. We do need to use some operator to increment value
        $set: { name: 'Biki'} // set is the mongodb operator. We do need to use some operator to set value
    }, {
        returnOriginal: false // Returns the updated document and not the original document
    } ).then((successResult) => { // Function called if Promise is fulfilled. Function has one argument
        console.log(`${JSON.stringify(successResult, undefined, 2)}`);
        console.log(`The updated document`);
        console.log(`${JSON.stringify(successResult.value, undefined, 2)}`);
    }, (failResult) => { // Function called if Promise is not fulfilled. Function has one argument
        console.log('Failed to update the document');
    } );

//    client.close();
});