'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('pokemon:pokemon-route');
const Pokemon = require('../model/pokemon.js');
const pokemonRouter = new Router();

pokemonRouter.post('/api/pokemon', jsonParser, function(req,res,next) {
  debug('POST: /api/pokemon');

  Pokemon.createPokemon(req.body)
  .then(pokemon => res.json(pokemon))
  .catch(err => next(err));
});

pokemonRouter.get('/api/pokemon/:id', function(req,res,next ) {
  debug('GET: /api/pokemon:id');

  Pokemon.fetchPokemon(req.params.id)
  .then(pokemon => res.json(pokemon))
  .catch(err=> next(err));
});

pokemonRouter.get('/api/pokemon', function(req, res, next) {
  debug('GET /api/pokemon');

  Pokemon.fetchIDs()
  .then(ids => res.json(ids))
  .catch(err => next(err));
});

pokemonRouter.put('/api/pokemon', jsonParser, function(req, res, next) {
  debug('PUT: /api/pokemon');

  Pokemon.updatePokemon(req.query.id,req.body)
  .then(pokemon => res.json(pokemon))
  .catch(err => next(err));
});

module.exports = pokemonRouter;