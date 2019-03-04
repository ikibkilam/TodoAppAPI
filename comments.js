// Update documents.

// 1. I installed lodash.
// 2. In app.patch route, used to update values, I got the ID.
// 3. I used the .pick() method to extract two properties in the request object. Note,
//    the request object contains three properties - text, completed and completedAt.
//    We do not want to extract completedAt, since this is not to be filled by the user,
//    but by the server app, and we do this below. Text and completed will be filled by
//    user, presumably on the client (and we simulate this in Postman). See the format
//    for the .pick() method in the lodash docs, and note it returns an object with the
//    extracted properties.
// 4. Next, I check if the ID is valid, as before.
// 5. Then, I update the completedAt property, based on the request object properties,
//    text and completed. If the complete property is boolean and is true, then we 
//    update the completedAt property, and if not, then we do not. Note, since completedAt
//    is a type number, we just need to initialize it to a unique number, if the complete
//    property is true. And we need to initialize it to null if complete is false.
// 6. Use findByIdAndUpdate() method, which has the format (id, update object, options).
//    The update object is the object that we want to update, and it could be an object
//    with the property being updated, or, properties being updated. Options is an object
//    with some parameters, such as new, which returns the modified document, instead of
//    the default original document. See documentation on this method in mongoose. I did
//    check if there is any document returned (ie. did ID exist), and if not, I just 
//    returned an error. Also, in the catch statement, I return a 400 error. 
// 7. Note, error 400 says, the server will not process request because client request was bad
//    (malformed request syntax, invalid request framing etc.). The 404 error says, client
//    was able to communicate with the server, but the server could not find the what was
//    requested.
// 8. I tested in Postman. Note, the PATCH http verb and request is all about providing the
//    the data, and so we provide this body in the form of JSON, using the upper half of the
//    Postman screen. The lower half of the screen shows me the response object.
// 9. Since all files are being tracked but have not been updated, I used git commit -a -m "",
//    to commit the changes to git.