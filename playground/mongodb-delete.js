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

    // // DeleteOne. I used the mongodb driver for nodejs documentation to get the format for the deleteOne
    // // method. This also spelt out the format of the callback. The result object in callback is an object,
    // // that I just print. This shows the number of documents deleted, and if the deletes were successful -
    // // this is contained in the deleteWriteOpResult object explanation in the docs, since result object is
    // // of this type. I did look at the mongodb documentation for deleteOne, but the above docs were more 
    // // appropriate. Commented out for clarity.
    // db.collection('Todos').deleteOne( {"text": 'Eat lunch'}, undefined, (err, result) => {
    //     if (err) {
    //         return console.log('Could not delete document');
    //     }
    //     console.log(`${JSON.stringify(result, undefined, 2)}`);
    // });

    // findOneAndDelete. I used the mongodb driver for nodejs documentation to get the format for the
    // findOneAndDelete method. This also spelt out the format of the callback. The result object in callback 
    // is an object, of type, Collection-findAndModifyWriteOpResult, that I just print. This shows the number 
    // of documents deleted (lastErrorObject), the document deleted and if the deletes were successful - this 
    // is contained in the findAndMoodidyWriteOpResult object explanation in the docs, since result object is of 
    // this type. I did look at the mongodb documentation for deleteOne, but the above docs were more appropriate.
    // Note,I did print the value of the document deleted. Commented for clarity.
    // db.collection('Todos').findOneAndDelete( {text: 'Eat lunch'}, undefined, (err, result) => {
    //     if (err) {
    //         return console.log('Could not delete document')
    //     }
    //     console.log(`${JSON.stringify(result, undefined, 2)}`);
    //     console.log(`The deleted document: ${JSON.stringify(result.value, undefined, 2)}`);
    // });

    // // DeleteMany. Same as deleteOne above. Commented out for clarity.
    // db.collection('Todos').deleteMany( {"text": 'Eat lunch'}, undefined, (err, result) => {
    //     if (err) {
    //         return console.log('Could not delete document');
    //     }
    //     console.log(`${JSON.stringify(result, undefined, 2)}`);
    // });

    // Delete using an ID.
    db.collection('Users').findOneAndDelete( { _id: new ObjectID('5c597136b0a323a5c5e1693e') }, undefined, (err, result) => {
        if (err) {
            return console.log('Could not delete document')
        }
        console.log(`${JSON.stringify(result, undefined, 2)}`);
        console.log(`The deleted document: ${JSON.stringify(result.value, undefined, 2)}`);
    });

//    client.close();
});