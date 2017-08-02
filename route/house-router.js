'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('house:house-router');
const House = require('../model/house.js');
const houseRouter = new Router();

houseRouter.post('/api/house', jsonParser, function(req, res, next) {
  debug('POST: /api/house');

  House.createHouse(req.body)
  .then(house => res.json(house))
  .catch(err => next(err));
});

houseRouter.get('/api/house/:id', function(req, res, next) {
  debug('GET: /api/house/:id');

  House.fetchHouse(req.params.id)
  .then(house => res.json(house))
  .catch(err => next(err));
});

houseRouter.get('/api/house', function(req, res, next) {
  debug('GET: /api/house');

  House.fetchIDs()
  .then(ids => res.json(ids))
  .catch(err => next(err));
});

houseRouter.put('/api/house', jsonParser, function(req, res, next) {
  debug('PUT: /api/house');

  House.updateHouse(req.query.id, req.body)
  .then(house => res.json(house))
  .catch(err => next(err));
});

houseRouter.delete('/api/house', function(req, res, next) {
  debug('DELETE: /api/house');

  House.deleteHouse(req.query.id)
  .then(() => {
    res.status(204).end();
  })
  .catch(err => next(err));
});

module.exports = houseRouter;
