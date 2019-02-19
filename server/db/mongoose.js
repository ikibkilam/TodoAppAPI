// Mongoose startup code.

// Import module.
var mongoose = require('mongoose');

// Tell mongoose which promise library to use.
mongoose.Promise = global.Promise;

// Connect to database. 
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports = {
    mongoose
};