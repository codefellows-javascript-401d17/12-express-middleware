'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('beer:beer-router');
const Beer = require('../model/beer.js');
const beerRouter = new Router();

beerRouter.post('/api/beer', jsonParser, function(req, res, next){
  debug('POST: /api/beer');

  Beer.createBeer(req.body)
  .then( beer => res.json(beer))
  .catch( err => next(err));
});

beerRouter.get('/api/beer/:id', function(req, res, next){
  debug('GET: /api/beer/:id');

  Beer.fetchBeer(req.params.id)
  .then( beer => res.json(beer))
  .catch( err => next(err));
});

beerRouter.get('/api/beer', function(req, res, next){
  debug('GET: /api/beer');

  Beer.fetchBeer(req.params.id)
  .then( beer => res.json(beer))
  .catch( err => next(err));
});

beerRouter.getIDs('/api/beer', function(req, res, next)){
  debug('GETIDS: /api/beer');

  Beer.fetchIDs()
  .then( beerIDs => res.json(beerIDs))
  .catch( err => next(err));
};

beerRouter.put('/api/beer', function(req, res, next){
  debug('PUT: /api/beer');

  Beer.updateBeer(req.query.id, req.body)
  .next( beer => res.json(beer))
  .catch( err => next(err));
});

beerRouter.delete('/api/beer', function(req, res, next){
  debug('DELETE: api/beer');

  Beer.deleteBeer(req.params.id)
  .catch(err => next(err));
});

module.exports = beerRouter;
