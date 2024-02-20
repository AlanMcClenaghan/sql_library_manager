var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      next(error);
    }
  }
}

// /* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  /* Asynchronously use the findAll() method on the Book model 
  to get all the books, and store them in a variable */
  const books = await Book.findAll();
  /* Log out the books variable and use the res.json() method 
  to display the books on a webpage */
  console.log("Books from book: " + res.json(books));
  /* In the body of the GET ‘/’ route handler provided for you:
  Delete or comment out the res.render method */
  // res.render('index', { title: 'Express' });
}));

module.exports = router;