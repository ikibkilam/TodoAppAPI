// The code in this file gets one todo.

// 1. Import 3rd party modules.
// Import express.
const express = require('express');
// Import bodyParser.
const bodyParser = require('body-parser'); 
// Import mongoose
const {mongoose} = require('./db/mongoose');
// Import mongodb
const {ObjectID} = require('mongodb');
// Import lodash
const _ = require('lodash');

// 2. Import custom modules.
const {Todo} = require('./models/todo.js');
const {User} = require('./models/users.js');

// 3. Create app.
var app = express();

// 4. Initialize middleware.
app.use(bodyParser.json());

// 5. The POST route.
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// 6. The GET route.
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (error) => {
        res.status(400).send(error);
    });
});

// // 7. Get one route with route parameter
// app.get('/todos/:id', (req, res) => {
//     res.send(req.params);
// })  

// 7. Get one route
app.get('/todos/:id', (req, res) => {
    // Get the ID.
    var id = req.params.id;
    console.log(id);
    // ID is simply not valid - eg: an extra digit.
    if(!ObjectID.isValid(id)) {
        return res.status(404).send(); 
    }
    // Find the todo by ID.
    Todo.findById(id).then((todo) => {
        // ID is incorrect, in that it does not exist in collection.
        if(todo === null) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((error) => {
        res.status(400).send();
    });
});

// 8. Delete a todo.
app.delete('/todos/:id', (req, res) => {
    // Get the ID.
    var id = req.params.id;
    console.log(id);
    // Validate ID. If not valid return 404.
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    // Remove todo by ID.
    Todo.findByIdAndDelete(id).then((todo) => {
        // Success.
        // If ID does not exist in collection, return 404.
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((error) => {
        //Failure. Return 400 for example, if server is down.
    res.status(400).send();
    });
});

// 9. Update a todo.
app.patch('/todos/:id', (req, res) => {
    // Get the ID.
    var id = req.params.id;
    // Pick the text and completed properties (key-value pairs) from the request object.
    var body = _.pick(req.body, ['text', 'completed']);
    console.log('body: ', body);
    console.log('req.body: ', JSON.stringify(req.body, undefined, 2)); // I stringiifed this to show that the req object is a JS object.
    // Validate ID. If not valid return 404.
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    // Update the value of property completedAt, based on the value of property completed.
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
    }
    // Update the values of the properties completed and text, based on user request.
    Todo.findByIdAndUpdate(id, body, {new: true}).then((todo) => {
        // Check if ID is returned and if not then return error.
        if (!todo) {
            return res.status(404),send();
        }
        // Return modified todo.
        res.send(todo);
    }).catch((error) => {
        res.status(400).send();
    });
});

// 9. Bind app to port
app.listen(3000, () => {
    console.log('Started server on port 3000');
});
