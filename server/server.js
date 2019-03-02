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

// // 7. Get one route
// app.get('/todos/:id', (req, res) => {
//     res.send(req.params);
// })  

// 7. Get one route
app.get('/todos/:id', (req, res) => {
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

// 8. Bind app to port
app.listen(3000, () => {
    console.log('Started server on port 3000');
});
