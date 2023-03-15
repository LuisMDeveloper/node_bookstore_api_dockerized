var express = require('express');
var router = express.Router();

//mock data
const books = [
  { id: 1, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951, price: 14.99 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, price: 19.99 },
  { id: 3, title: '1984', author: 'George Orwell', year: 1949, price: 29.99 },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, price: 9.99 },
  { id: 5, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, price: 24.99 }
];

router.get('/', (req, res) => {
  res.json(books);
});

router.get('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(book => book.id === bookId);

  if (!book) {
    return res.status(404).send('No book found with that ID');
  }

  res.json(book);
});

router.post('/', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);

  res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookToUpdate = books.find(book => book.id === bookId);

  if (!bookToUpdate) {
    return res.status(404).send('No book found with that ID');
  }

  const updatedBook = req.body;
  updatedBook.id = bookToUpdate.id;
  const bookIndex = books.findIndex(book => book.id === bookId);
  books[bookIndex] = updatedBook;

  res.json(updatedBook);
});

router.delete('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(book => book.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).send('No book found with that ID');
  }

  books.splice(bookIndex, 1);
  res.sendStatus(204);
});

module.exports = router;
