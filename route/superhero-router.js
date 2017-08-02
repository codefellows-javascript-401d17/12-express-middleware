'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('superhero:superhero-router');
const Superhero = require('../model/superhero.js');
const superheroRouter = new Router();

superheroRouter.post('/api/superhero', jsonParser, function(req, res, next) {
  debug('POST: /api/superhero');

  Superhero.createSuperhero(req.body)
  .then( superhero => res.json(superhero))
  .catch( err => next(err));
});

superheroRouter.get('/api/superhero/:id', function(req, res, next) {
  debug('GET: /api/superhero/:id');

  Superhero.fetchSuperhero(req.params.id)
  .then( superhero => res.json(superhero))
  .catch( err => next(err));
});

superheroRouter.get('/api/superhero', function(req, res, next) {
  debug('GET: /api/superhero');

  Superhero.fetchIDs()
  .then( ids => res.json(ids))
  .catch( err => next(err));
});

superheroRouter.put('/api/superhero', jsonParser, function(req, res, next) {
  debug('PUT: /api/superhero');

  Superhero.updateSuperhero(req.query.id, req.body)
  .then( superhero => res.json(superhero))
  .catch( err => next(err));
});

module.exports = superheroRouter;
