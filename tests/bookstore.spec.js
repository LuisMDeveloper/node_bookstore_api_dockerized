const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../app");
const http = require("http");
const expect = chai.expect;

chai.use(chaiHttp);

describe('Bookstore API', () => {
    let server = http.createServer(app);
    let port = '3000'

    // Start the server before each test
    beforeEach(() => {
        server.listen(port);
    });

    // Stop the server after each test
    afterEach(() => {
        server.close();
    });

    // Test GET /books
    describe('GET /books', () => {
        it('should return an array of all books', (done) => {
            chai.request(server)
                .get('/books')
                .end((error, response) => {
                    expect(response).to.have.status(200);
                    expect(response.body).to.be.an('array');
                    expect(response.body[0]).to.have.property('id');
                    expect(response.body[0]).to.have.property('title');
                    expect(response.body[0]).to.have.property('author');
                    expect(response.body[0]).to.have.property('year');
                    expect(response.body[0]).to.have.property('price');
                    done();
                });
        });
    });

    // Test GET /books/:id
    describe('GET /books/:id', () => {
        it('should return a single book by ID', (done) => {
            chai.request(server)
                .get('/books/3')
                .end((error, response) => {
                    expect(response).to.have.status(200);
                    expect(response.body).to.be.an('object');
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('title').equal('1984');
                    expect(response.body).to.have.property('author').equal('George Orwell');
                    expect(response.body).to.have.property('year').equal(1949);
                    expect(response.body).to.have.property('price').equal(29.99);
                    done();
                });
        });
    });

    // Test POST /books
    describe('POST /books', () => {
        it('should add a new book', (done) => {
            const newBook = {
                title: 'The Hobbit',
                author: 'J.R.R. Tolkien',
                year: 1937,
                price: 12.99
            };

            chai.request(server)
                .post('/books')
                .send(newBook)
                .end((error, response) => {
                    expect(response).to.have.status(201);
                    expect(response.body).to.be.an('object');
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('title').equal('The Hobbit');
                    expect(response.body).to.have.property('author').equal('J.R.R. Tolkien');
                    expect(response.body).to.have.property('year').equal(1937);
                    expect(response.body).to.have.property('price').equal(12.99);
                    done();
                });
        });
    });

    // Test PUT /books/:id
    describe('PUT /books/:id', () => {
        it('should update an existing book', (done) => {
            const updatedBook = {
                title: '1984',
                author: 'George Orwell',
                year: 1949,
                price: 24.99
            };

            chai.request(server)
                .put('/books/3')
                .send(updatedBook)
                .end((error, response) => {
                    expect(response).to.have.status(200);
                    expect(response.body).to.be.an('object');
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('title').equal('1984');
                    expect(response.body).to.have.property('author').equal('George Orwell');
                    expect(response.body).to.have.property('year').equal(1949);
                    expect(response.body).to.have.property('price').equal(24.99);
                    done();
                });
        });
    });

    // Test DELETE /books/:id
    describe('DELETE /books/:id', () => {
        it('should delete an existing book', (done) => {
            chai.request(server)
                .delete('/books/3')
                .end((error, response) => {
                    expect(response).to.have.status(204);
                    done();
                });
        });
    });
});
