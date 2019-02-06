// Use destructuring to get the MongoClient and ObjectID objects from the mongodb library.
// anywhere to create new ids.
const {MongoClient, ObjectID} = require('mongodb')

// Connect to mongodb.
MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB database server');
    }
    console.log('Connected to MongoDB database server');

    // Get a reference to the TodoApp database.
    const db = client.db('TodoApp');

    // Two ways to fetch all the documents.
    // A cursor is returned by find() and the cursor will be iterated automatically, when the result of
    // the query is returned. A cursor is a pointer to the result set of a query.  The automatic iteration
    // of the cursor returns 20 results in the shell. We can use forEach(function), where we iterate
    // over each document and apply a function each document.
    console.log('Todos');
    console.log('----------------------')
    const myCursor = db.collection('Todos').find();
    console.log(`Fetch all in a simpler way`);
    myCursor.forEach((doc) => {
        console.log(`${JSON.stringify(doc, undefined, 2)}`);
    });
    // Fetch all documents. find() returns a cursor. We then use a common method on the cursor, toArray(),
    // that returns an array of all the documents on the cursor. The documents in the array are loaded into
    // memory, and the cursor is exhausted. This is a memory intensive operation. We then use the then 
    // function, to return a promise. If the promise is a success, we execute the first code segment, else
    // the second segment. I prefer the above approach.
    db.collection('Todos').find().toArray().then((docs) => {
        console.log(`Fetch all the hard way: ${JSON.stringify(docs, undefined, 2)}`);
    }, (err) => {
        console.log('Unable to fetch documents');
    });

    // Fetch only the document that have completed property as true. Note, the {} is used to define the query.
    const myCursor2 = db.collection('Todos').find({completed: true});
    myCursor2.forEach((doc) => {
        console.log(`Fetch based on query using a property: ${JSON.stringify(doc, undefined, 2)}`);
    });

     // Fetch only the document by title. Note, the {} is used to define the query. And note we cannot use
     // the _id string as is, since the _id is a 12 digit hexadecimal number. So, we have to make an object
     // using the string, as below.
     var id = new ObjectID('5c5997053f8863f75334637b');
     const myCursor3 = db.collection('Todos').find({completed: true});
     myCursor3.forEach((doc) => {
         console.log(`Fetch based on query using ID: ${JSON.stringify(doc, undefined, 2)}`);
     });

     // Count the documents. I read the API docs - the method count(applySkipLimit, options, callback)
     // was implemented. All arguments are optional. It returns a promise, if there is no callback. I
     // implemented a callback. Since, the callback was the third argument, I specified the first 
     // argument as false, since default is true, specified second argument as undefined, and then a
     // callback. The callback takes the format, countResultCallback(err, count), and I simply wrote
     // some logic to get this working. Cool, I know how to read the API documentation!
     const myCursor4 = db.collection('Todos').find({});
     myCursor4.count(false, undefined, (err, count) => {
         if (err) {
             return (console.log(`Could not get the count of documents in collection Todos`));
         }
        console.log(`Number of documents in collection Todos: ${count}`);
     });

     // Find documents with user, Biki or Monica, in the Users collection.
     const myCursor5 = db.collection('Users').find( { name: { $in: ['Biki', 'Monica'] } } );
     myCursor5.forEach((doc) => {
        console.log('The documents with name, Biki');
        console.log(`${JSON.stringify(doc, undefined, 2)}`);
     }, (err) => {
        if(err) {
            return ('Could not get documents with name Biki');
        }
     });



//    client.close();
});