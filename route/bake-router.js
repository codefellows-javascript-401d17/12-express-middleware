'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('bake:bake-router');
const Bake = require('../model/bake.js');
const bakeRouter = new Router();

module.exports = bakeRouter;

bakeRouter.get('/test', function(req, res) {
  debug('TEST');

  res.json({ msg: 'hello'});
});

bakeRouter.post('/api/bake', jsonParser, function(req, res, next) {
  debug('POST: /api/bake');

  Bake.createBakedGood(req.body)
  .then( bake => res.json(bake))
  .catch( err => next(err));
});

bakeRouter.get('/api/bake/:id', function(req, res, next) {
  debug('GET: /api/bake/:id');

  Bake.fetchBakedGood(req.params.id)
  .then( bake => res.json(bake))
  .catch( err => next(err));
});

bakeRouter.get('/api/bake', function(Req, res, next) {
  debug('GET: /api/bake');

  Bake.fetchIDs()
  .then( ids => res.json(ids))
  .catch( err => next(err));
});

bakeRouter.put('/api/bake/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/bake/:id');

  Bake.updateBake(req.params.id, req.body)
  .then( bake => res.json(bake))
  .catch( err => next(err));
});

bakeRouter.delete('/api/bake', function(req, res, next) {
  debug('DELETE: /api/bake');

  Bake.deleteBakedGood(req.query.id)
  .then( () => {
    res.status(204).end();
  })
  .catch( err => next(err));
});