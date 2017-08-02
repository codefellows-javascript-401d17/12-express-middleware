'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Book = require('../model/book.js');

require('../server.js');

const testBookData = {
  title: 'Hamlet',
  author: 'Shakespeare',
  date: 1599,
  genre: 'Drama'
};

const updateBookData = {
  title: 'Macbeth',
  date: 1606
};

describe('Book API', function() {
  it('should return \'bad request\' if route not found.', function(done) {
    request.get('localhost:8000/ponies', function(error, response) {
      expect(response.status).to.equal(404);
      done();
    });
  });

  describe('GET: /', function() {
    it('should return a welcome message.', function(done) {
      request.get('localhost:8000/', function(error, response) {
        expect(response.text).to.equal('Welcome to Nathan\'s Book API using Express.');
        done();
      });
    });
  });

  describe('POST: /api/book/', function() {
    after(done => {
      Book.delete(this.testBook.id)
        .then(() => done())
        .catch(error => done(error));
    });

    it('should return a book.', done => {
      request.post('localhost:8000/api/book')
        .send(testBookData)
        .end((error, response) => {
          this.testBook = response.body;
          expect(response.status).to.equal(200);
          expect(this.testBook.id).to.be.a('string');
          expect(this.testBook.title).to.equal(testBookData.title);
          expect(this.testBook.author).to.equal(testBookData.author);
          expect(this.testBook.date).to.equal(testBookData.date);
          expect(this.testBook.genre).to.equal(testBookData.genre);
          done();
        });
    });

    it('should return an error if posting with no body.', function(done) {
      request.post('localhost:8000/api/book')
        .send()
        .end(function(error, response) {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('Book not provided.');
          done();
        });
    });

    it('should return an error if posting with no title.', function(done) {
      request.post('localhost:8000/api/book')
        .send({
          author: testBookData.author,
          date: testBookData.date,
          genre: testBookData.genre
        })
        .end(function(error, response) {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('Title not provided.');
          done();
        });
    });

    it('should return an error if posting with no author.', function(done) {
      request.post('localhost:8000/api/book')
        .send({
          title: testBookData.title,
          date: testBookData.date,
          genre: testBookData.genre
        })
        .end(function(error, response) {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('Author not provided.');
          done();
        });
    });

    it('should return an error if posting with no date.', function(done) {
      request.post('localhost:8000/api/book')
        .send({
          title: testBookData.title,
          author: testBookData.author,
          genre: testBookData.genre
        })
        .end(function(error, response) {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('Date not provided.');
          done();
        });
    });

    it('should return an error if posting with no genre.', function(done) {
      request.post('localhost:8000/api/book')
        .send({
          title: testBookData.title,
          author: testBookData.author,
          date: testBookData.date,
        })
        .end(function(error, response) {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('Genre not provided.');
          done();
        });
    });
  });

  describe('GET: /api/book', function() {
    before(done => {
      Book.create(testBookData)
        .then(book => {
          this.testBook = book;
          done();
        })
        .catch(error => done(error));
    });

    after(done => {
      Book.delete(this.testBook.id)
        .then(() => done())
        .catch(error => done(error));
    });

    it('should return a list of ids if id not provided.', function(done) {
      request.get('localhost:8000/api/book', function(error, response) {
        expect(response.body).to.be.an('array');
        done();
      });
    });

    it('should return an error if id not found.', function(done) {
      request.get('localhost:8000/api/book/1', function(error, response) {
        expect(response.status).to.equal(404);
        expect(response.text).to.equal('Book not found.');
        done();
      });
    });

    it('should return a book.', done => {
      request.get(`localhost:8000/api/book/${this.testBook.id}`, (error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.be.equal(this.testBook.id);
        expect(response.body.title).to.equal(this.testBook.title);
        expect(response.body.author).to.equal(this.testBook.author);
        expect(response.body.date).to.equal(this.testBook.date);
        expect(response.body.genre).to.equal(this.testBook.genre);
        done();
      });
    });
  });

  describe('PUT: /api/book/', function() {
    before(done => {
      Book.create(testBookData)
        .then(book => {
          this.testBook = book;
          done();
        })
        .catch(error => done(error));
    });

    after(done => {
      Book.delete(this.testBook.id)
        .then(() => done())
        .catch(error => done(error));
    });

    it('should return a book.', done => {
      request.put(`localhost:8000/api/book/${this.testBook.id}`)
        .send({
          title: 'Macbeth',
          date: 1606,
        })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.id).to.equal(this.testBook.id);
          expect(response.body.title).to.equal(updateBookData.title);
          expect(response.body.author).to.equal(this.testBook.author);
          expect(response.body.date).to.equal(updateBookData.date);
          expect(response.body.genre).to.equal(this.testBook.genre);
          done();
        });
    });
  });

  describe('DELETE: /api/book', function() {
    before(done => {
      Book.create(testBookData)
        .then(book => {
          this.testBook = book;
          done();
        })
        .catch(error => done(error));
    });

    it('should delete a book.', done => {
      request.delete(`localhost:8000/api/book/${this.testBook.id}`, function(error, response) {
        expect(response.status).to.equal(204);
        done();
      });
    });
  });
});
