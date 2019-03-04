// Remove documents.

// 1. I setup the code for Todo.remove() and found that this is deprecated.
// 2. I setup the code for Todo.deleteOne() and found that as in Todo.remove
//    it returns and object that shows how many documents were deleted.
// 3. I setup the code for findByIdAndDelete() and found that this actually
//    returns the deleted document. This is nice.
// 4. I then moved to server.js and wrote a handler for a delete operation
//    based on this learning.