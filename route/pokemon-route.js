'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Pokemon = require('../model/pokemon.js');

module.exports = function(router) {
  router.get('/api/pokemon', function(req, res) {
    if(req.url.query.id) {
      storage.fetchItem('pokemon', req.url.query.id)
      .then((pokemon) => {
        response.sendJSON(res, 200, pokemon);
      })
      .catch(err => {
        response.sendText(res, 404, 'not found');
      });

      return;
    }

    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/pokemon', function(req, res) {
    try {
      var pokemon = new Pokemon(req.body.name, req.body.type, req.body.gen);
      storage.createItem('pokemon', pokemon);
      response.sendJSON(res, 200, pokemon);
    } catch(err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
};