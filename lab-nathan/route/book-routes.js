'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('book:book');
const createError = require('http-errors');

const Book = require('../model/book.js');

let bookRouter = new Router();

module.exports = bookRouter;

bookRouter.get('/', function(request, response) {
  debug('GET: /');

  response.send('Welcome to Nathan\'s Book API using Express.');
});

bookRouter.get('/api/book/:id', function(request, response, next) {
  debug('GET: /api/book/:id');

  Book.get(request.params.id)
    .then(book => response.json(book))
    .catch(error => next(error));
});

bookRouter.get('/api/book', function(request, response, next) {
  debug('GET: /api/book');

  Book.getIds()
    .then(ids => response.json(ids))
    .catch(error => next(error));
});

bookRouter.post('/api/book', jsonParser, function(request, response, next) {
  debug('POST: /api/book');

  if (Object.keys(request.body).length === 0) {
    return next(createError(400, 'Book not provided.'));
  }

  Book.create(request.body)
    .then(book => response.json(book))
    .catch(error => next(createError(400, error.message)));
});

bookRouter.put('/api/book/:id', jsonParser, function(request, response, next) {
  debug('PUT: /api/book');

  if (Object.keys(request.body).length === 0) {
    return next(createError(400, 'Book not provided.'));
  }

  Book.update(request.params.id, request.body)
    .then(book => response.json(book))
    .catch(error => next(createError(400, error.message)));
});

bookRouter.delete('/api/book/:id', function(request, response, next) {
  debug('DELETE: /api/book');

  Book.delete(request.params.id)
    .then(() => response.sendStatus(204))
    .catch(error => next(error));
});