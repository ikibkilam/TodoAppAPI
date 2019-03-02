// Get single resource.

// 1. The code to get one resource is similar to that of getting all resources. I created
//    this module, and then used res.send(req.params) and Postman to see what req.params,
//    returns. 
// 2. First, what are route parameters? Route parameters are named URL segments that are
//    used to capture the values specified at their position in the URL. The captured values
//    are populated in the req.params object, with the name of the route parameter in the
//    path as the respective key. So, Req.params is an object, with key-value pairs.
//    See https://expressjs.com/en/guide/routing.html#route-parameters.
// 3. When I run the app.get module with 'todos/:id', this gets translated into todos/id/123,
//    where 123 is some number (could be any number). I test this with Postman, where I
//    entered the url localhost:3000/todos/id/123, used GET and I see that the param object
//    returned is {"id": "123"}. I then commented this module, and wrote another app.get
//    module that actually gets a single document from the database.
// 4. To get a single document from the database, I used req.params.id to get the id that
//    was sent in the request. I then used findById method, using a then and catch methods.
//    The then method has a check for an ID that did not exist in collection, and if it did
//    not, we send back an error code, without error object (since there might sensitive
//    information in the body). If ID exists, we send back the todo. The catch code sends
//    back an error code, but without the error object (for the same reason as aforementioned).
// 5. Note, it is best to use return statements when the ObjectID is not valid and when todo
//    does not exist, since this then stops further execution. Note that todos/:id gets resolved
//    to a URL, localhost:3000/todos/5c79704251577c0500ca434d.
// 6. Note, I did test the cases, where the ID is just incorrect, and the case where id format is
//    right but the ID and hence the todo did not exist. In this case, I get 404 errors.
// 7. I saved the request in the todos collection in Postman.
// 8. I committed the changes and pushed them to github, using git commit -a -m ''.