// Resource Creation Endpoint.

// 1. I refactored the server.js code.
// 2. First, I removed the mongoose specific start up code into a separate file and
//    imported this file, in server.js.
// 3. Next, I added the todo model creation code to the todo.js file, and imported this file
//    in server.js
// 4. I also added the user model creation code to the user.js file, and imported this file 
//    in server.js.
// 5. I installed express and body-parser. Body-parser, parses incoming request bodies in a
//    middleware before handlers in routes kick-in.
// 6. I tested that the server starts up on port 3000, by including a print statement, console.
//    log(req.body), in a route handler (app.post('todos', (req, res))).
// 7. I then opened Postman, and in the POST command:
//    1. Entered the URL, 'localhost:3000/todos', which is the URL we want to post to.
//    2. Under 'Body', we selected 'raw' and under 'text' we chose application/json.
//    3. In 'Body', I typed the below and clicked send. Nothing should happen, since we have
//       not setup routes as yet. The message below however does show up on the console, because
//       in the route that handles /todos, we have the statement, console.log(req.body), and the
//       the req.body is what we typed below.
//  	 {
//           "text": "This is from Postman"
//       }
// 8. I then removed the print statement, console.log(req.body), and setup an actual route handler.
//    1. I created a document (in MongoDB parlance), which is simply an instance of a model. Note,
//       I had defined a schema and the model, Todo, in todo.js. Note, within this document, I 
//       grab the text property of the incoming request. req.body contains key-value pairs of
//       data submitted in the request body. By default, it is undefined, but gets populated when
//       we use body parsing middleware, such body-parser.
//    2. I then saved this document to the database, using todo.save(), which we know returns a
//       promise. And promise.then() allows us to handle the success and failure events. The 
//       success event sends the document back to the client, and the failure event sends the
//       error back to the client.
//    3. Note, I use res.status(400).send(e). This sends the error code 400 and the error object
//       so the user can detect what went wrong. To see the HTTP status codes, type 'http status
//       codes' in google.
// 9. I restarted server.
// 10.I tested the above code using postman, for both valid user input and invalid user input. 
//    1. For example, for valid user input, I used the same text as in #7. I get a 200 response and the 
//       JSON response is exactly what we expected: "text": "This is from postman", "_id":"12213131...",
//       "completedAt": null, "completed": false. This is because we grabbed the text property from the
//       req object (ie. req.body.text). Note, The req object represents the HTTP request and has properties 
//       for the request query string, parameters, body, HTTP headers, and so on.
//    2. For example, for invalid user input, I sent an empty string in Postman, instead of the #7.
//       We get back a '400 bad request' response error in Postman. Postman also shows the complete
//       error object, and if we wanted we could pull out the exact error, ie. the text field failed,
//       and the message is, 'Path text is required', and print this.
//       {
//          "errors": {
//              "text": {
//                  "message": "Path text is required",
//                  "name": ValidationError,
//                  etc...
//              }
//          }
//       }
// 11. We can go to Robomongo and check that a record was created, with _id, completed, completedAt, text
//     _v properties.
// 12. I added the changes to git.