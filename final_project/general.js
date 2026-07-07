const axios = require('axios');

const BASE_URL = "http://localhost:5000";

// Task 10: Get all books using Axios and Async/Await
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log("All Books:\n", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all books:", error.message);
  }
}

// Task 11: Search by ISBN using Axios and Promises
function getBookByISBN(isbn) {
  return axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then((response) => {
      console.log(`Book with ISBN ${isbn}:\n`, response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
    });
}

// Task 12: Search by Author using Axios and Promises
function getBooksByAuthor(author) {
  return axios.get(`${BASE_URL}/author/${author}`)
    .then((response) => {
      console.log(`Books by ${author}:\n`, response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(`Error fetching books by author "${author}":`, error.message);
    });
}

// Task 13: Search by Title using Axios and Promises
function getBooksByTitle(title) {
  return axios.get(`${BASE_URL}/title/${title}`)
    .then((response) => {
      console.log(`Books with title "${title}":\n`, response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(`Error fetching books with title "${title}":`, error.message);
    });
}

// Run all four methods in sequence to demonstrate them
(async () => {
  await getAllBooks();
  await getBookByISBN(1);
  await getBooksByAuthor("Jane Austen");
  await getBooksByTitle("Fairy tales");
})();

module.exports = { getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle };
