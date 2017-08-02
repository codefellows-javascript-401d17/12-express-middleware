'use strict';

module.exports = corsMiddleware;

function corsMiddleware(request, response, next) {
  response.append('Access-Control-Allow-Origin', '*');
  response.append('Access-Control-Allow-Headers', '*');
  next();
}