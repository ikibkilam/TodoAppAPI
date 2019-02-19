// Code specific to creating a model for a user document in a users collection.

// Import 3rd party modules.
var mongoose = require('mongoose');

// Create a schema
var Schema = mongoose.Schema;
var userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        minlength: 1, 
        trim: true 
    }
});

// Create a model.
var User = mongoose.model('User', userSchema);

module.exports = {
    User
};