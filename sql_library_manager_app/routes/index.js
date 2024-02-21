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
// get / - Home route should redirect to the /books route
router.get('/', asyncHandler(async (req, res) => {
  /* In the body of the GET ‘/’ route handler provided for you:
  Delete or comment out the res.render method */
  // res.render('index', { title: 'Express' });
  // get / - Home route should redirect to the /books route
  res.redirect('/books');
}));

// get /books - Shows the full list of books
router.get('/books', asyncHandler(async (req, res) => {
  /* Asynchronously use the findAll() method on the Book model 
  to get all the books, and store them in a variable */
  const books = await Book.findAll();
  // /* Log out the books variable and use the res.json() method 
  // to display the books on a webpage */
  console.log("Books from book: " + res.json(books));
  res.render('index', { books, title: "Books" });
}));

// get /books/new - Shows the create new book form
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render('new-book', { book: {}, title: "New Book" });
}));

// post /books/new - Posts a new book to the database
router.post('/books/new', asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.redirect('books' + book.id);
}));

// get /books/:id - Shows book detail form
router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('update-book', { book, title: book.title });
}));

// post /books/:id - Updates book info in the database
router.post('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update();
  res.redirect('books' + book.id);
}));

/* post /books/:id/delete - Deletes a book. Be careful, this can’t be undone. 
It can be helpful to create a new “test” book to test deleting */
// post /books/:id - Updates book info in the database
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('books');
}));

module.exports = router;