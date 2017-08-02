'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('car:car-router');
const Car = require('../model/car.js');
const carRouter = new Router();

carRouter.post('/api/note', jsonParser, function(req, res, next) {
  debug('POST: /api/car');

  Car.createCar(req.body)
  .then( car => res.json(car))
  .catch( err => next(err));
});

carRouter.get('/api/car/:id', function(req, res, next) {
  debug('GET: /api/car/:id');

  Car.fetchCar(req.params.id)
  .then( car => res.json(car))
  .catch( err => next(err));
});

carRouter.get('/api/car', function(req, res, next) {
  debug('GET: /api/car');

  Car.fetchIDs()
  .then( ids => res.json(ids))
  .catch( err => next(err));
});

carRouter.put('/api/car', jsonParser, function(req, res, next) {
  debug('POST: /api/car');

  Car.updateCar(req.quer.id, req.body)
  .then( car => res.json(car))
  .catch( err => next(err));
});

module.exports = carRouter;
