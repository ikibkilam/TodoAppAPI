// Code specific to creating a model for the todo document in the todos collection.

// Import 3rd party modules.
var mongoose = require('mongoose');

// Create a schema
var Schema = mongoose.Schema;
var todoSchema = new Schema ({
    text: {
        type: String,
        required: true, 
        minlength: 1,  
        trim: true
    },
    completed: {
        type: Boolean,
        default: false 
    },
    completedAt: {
        type: Number,
        default: null 
    }
});

// Create a model.
var Todo = mongoose.model('Todo', todoSchema);

module.exports = {
    Todo
};