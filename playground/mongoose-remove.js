// Here we study different queries in Mongoose to remove documents from the MongoDB database.

const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// Remove all documents. Remove returns a Query object, which behaves like a promise, and so we
// we can apply the .then() method. When I run the code below, I get back a message in the console
// that says that collection.remove is deprecated and instead use deleteOne, deleteMany. Also,
// I see {n: 11, ok: 1, deleteCount: undefined}. So it does work. And I checked the database and
// saw that all the todos have been deleted. I commented the code out, so I can run code below.
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Remove one document, using available deleteOne. I get back {n: 1, ok: 1, deletedCount: 1}. And I
// checked the database, and found that one document was deleted. I commented the code out so I can
// run code below.
// Todo.deleteOne({_id: '5c7acb9b2c436c5700b63d56'}).then((result) => {
//     console.log(result);
// });

// I can also use findOneAndRemove. Note, this returns a document instead of how many documents were
// deleted as in deleteOne.

// I ran findByIdAndDelete. Note, this also returns a document. And I did see the document returned.
Todo.findByIdAndDelete('5c7acb922c436c5700b63d55').then((todo) => {
    console.log(todo);
});