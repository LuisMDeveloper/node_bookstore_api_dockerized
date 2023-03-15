# Bookstore API Dockerized

This is an ExpressJS API for a fictional bookstore that provides endpoints for managing books, including creating, reading, updating, and deleting books. The API uses an in-memory JSON object as its data source, making it easy to set up and run.

## Getting Started

To get started, simply clone the repository and run the following commands:

```bash
npm install
npm start
```

> Note: The API will start listening on port 3000 by default.

## Docker

This app is fully Dockerized, making it easy to deploy to any environment that supports Docker. To build and run the Docker image, use the following commands:

```bash
docker build -t bookstore-api .
docker run -p 3000:3000 bookstore-api
```

## Endpoints

The API provides the following endpoints for managing books:

- `GET /books`: returns a list of all books
- `GET /books/:id`: returns a single book by ID
- `POST /books`: creates a new book
- `PUT /books/:id`: updates an existing book by ID
- `DELETE /books/:id`: deletes a book by ID

## Testing

This project includes a suite of Mocha and Chai tests to ensure the API is functioning correctly. To run the tests, use the following command:

```bash
npm test
```
