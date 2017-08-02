'use strict';

const createError = require('http-errors');
const debug =  require('debug')('book:error-middleware');

module.exports = errorMiddleware;

function errorMiddleware(error, request, response, next) {
  debug('errorMiddleware');
  console.error(error.message);

  if (!next) {
    error = createError(404);
  }

  if (error.status) {
    return response.status(error.status).send(error.message);
  }

  error = createError(500, error.message);
  response.status(error.status).send(error.name);
  next();
}