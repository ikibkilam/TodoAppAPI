// The code in this file is responsible for the server routes.
// Inside the REST API there are the basic CRUD operations - Create, Read, Update, Delete. When we want
// to create a resource, we use the POST method, and we send the resource as the body of the POST method.
// So, when we want to create a new Todo, we send a JSON object with a text property, to the server. The
// server takes that property and creates the new model, and send the complete model, with the id, the 
// completed property, and the competeat property, back to the client.

// Import 3rd party modules.
const express = require('express');
// The bodyParser object exposes various factories to create middlewares. All middlewares will populate the req.body 
// property with the parsed body when the Content-Type request header matches the type option, or an empty object ({})
// if there was no body to parse, the Content-Type was not matched, or an error occurred.
const bodyParser = require('body-parser'); // Takes the JSON and converts it to an object and attaches it to request object

// Import custom modules.
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/users.js');

// Create app.
var app = express();

// Initialize middleware
// bodyParser.json(), returns middleware that only parses json and only looks at requests where the Content-Type
// header matches the type option. The type option is used to determine what media type the middleware will parse. 
// This option can be a string, array of strings, or a function. If not a function, type option is passed directly 
// to the type-is library and this can be an extension name (like json), a mime type (like application/json), or 
// a mime type with a wildcard (like */* or */json). Defaults to application/json.
app.use(bodyParser.json());

// The post method, like other express routes, also takes two arguments - the URL and the callback function
// that takes req and res as the arguments. The URL is written as below, which allows us to get (using the
// GET method) all the todos (./todos), using this URL, or a single todo (./todos/id). Below, we are using
// POST method, since we are posting a user input into the database. See the comment.js file for detailed 
// discussion of the code below.
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

// Bind app to port
app.listen(3000, () => {
    console.log('Started server on port 3000');
});
