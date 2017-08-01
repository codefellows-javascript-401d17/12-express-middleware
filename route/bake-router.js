'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('bake:bake-router');
const Bake = require('../model/bake.js');
const bakeRouter = new Router();

module.exports = bakeRouter;

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

bakeRouter.get('/api/note', function(Req, res, next) {
  debug('GET: /api/note');

  Note.fetchIDs()
  .then( ids => res.json(ids))
  .catch( err => next(err));
});

bakeRouter.put('/api/note/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/note/:id');

  Bake.updateBake(req.params.id, req.body)
  .then( note => res.json(note))
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