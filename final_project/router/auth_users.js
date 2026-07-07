const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Check if username already exists
const isValid = (username) => {
  let userswithsamename = users.filter((user) => user.username === username);
  return userswithsamename.length > 0;
}

// Check if username/password combination is valid
const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => (user.username === username && user.password === password));
  return validusers.length > 0;
}

// Task 8: Login as a registered user
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in. Username and password required." });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).json({ message: "User successfully logged in", accessToken: accessToken });
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Task 9: Add or modify a book review (logged in users only, own review only)
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!review) {
    return res.status(404).json({ message: "Review text is required as a query parameter, e.g. ?review=Great+book" });
  }

  books[isbn].reviews[username] = review;
  return res.status(200).json({
    message: `The review for ISBN ${isbn} has been added/updated`,
    reviews: books[isbn].reviews
  });
});

// Task 10: Delete a book review (logged in users only, own review only)
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({
      message: `The review for ISBN ${isbn} has been deleted`,
      reviews: books[isbn].reviews
    });
  } else {
    return res.status(404).json({ message: "No review found by this user for this book" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
