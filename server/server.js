// The code in this file gets all the todos - I need to complete this, since I started the weather app.

// Inside the REST API there are the basic CRUD operations - Create, Read, Update, Delete. When we want
// to create a resource, we use the POST method, and we send the resource as the body of the POST method.
// So, when we want to create a new Todo, we send a JSON object with a text property, to the server. The
// server takes that property and creates the new model, and send the complete model, with the id, the 
// completed property, and the competeat property, back to the client.

// 1. Import 3rd party modules.
// Import express.
const express = require('express');
// Import bodyParser.
const bodyParser = require('body-parser'); 

// 2. Import custom modules.
const {mongoose} = require('./db/mongoose');
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

// 7. Bind app to port
app.listen(3000, () => {
    console.log('Started server on port 3000');
});
