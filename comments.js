// List Resources

// 1. I write a route handler for getting all the todos.
// 2. Note, mongoose async operations, such as save, queries, return thenables. So we can
//    do things like MyModel.find().then(). However, do note, mongoose queries are not
//    promises. They have a .then() function as a convenience. I did use this in the code
//    when I write the route handler for POST. Also, recall, a model is a collection of
//    documents, and an instance of a model is a document. So, a query is not a full fledged
//    promise, but it does a .then() method.
// 3  I used the same format for app.get as I did for app.post. However, the callback body
//    is different - I now use the model (collection) and the find() method to get all the
//    documents. Since, the query Todo.find() is thenable, I append a .then() method, to 
//    define the sucess and failure handlers. In the success handler, I return the todos,
//    and in the failure handler, I return an error. One thing to note, I did not return the
//    the todos array, and instead returned an object, {todos}, (ie. an object with the array)
//    since this allows me flexibility to return additional entities if I want to. With an array 
//    I did not have this flexibility.
// 4. Then I started the server application: node server/server.js. The server started on port 3000.
// 5. Now, I opened Postman. I ran with GET and localhost:3000/todos. I see all the todos below
//    in the Body. Nice! I also created and saved these routes for easily running these routes
//    in the future. See "Chapter Install Postman" on how to do this. Note, just to repeat, this
//    is done by Save -> Save As -> Enter name of route -> Enter collection we want to save in
//    or create a new collection. When we want to run, we can click on the route in left bar ->
//    Send. Note, I can simultaneously study Robo3T to see that todos are being created, when I
//    POST. I created another POST and then ran a GET and it all works!
// 6. Made a commit.
// 