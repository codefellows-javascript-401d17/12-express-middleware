'use strict'

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('hike:hike-route');
const Hike = require('../model/hike.js');
const hikeRouter = new Router();

hikeRouter.post('/api/hike', jsonParser, function(req,res,next){
  debug('POST: /api/hike');

  Hike.createHike(req.body)
  .then( hike => res.json(hike))
  .catch(err => next(err));
});

hikeRouter.get('/api/hike/:id', function(req,res,next ){
  debug('GET: /api/hike:id');

  Hike.fetchHike(req.params.id)
  .then(hike=> res.json(hike))
  .catch( err=> next(err));
});

hikeRouter.get('/api/hike', function(req, res, next){
  debug('GET /api/hike');

  Hike.fetchIDs()
  .then( ids => res.json(ids))
  .catch( err => next(err));
});

hikeRouter.put('/api/hike', jsonParser, function(req, res, next) {
  debug('PUT: /api/hike');

  Hike.updateHike(req.query.id,req.body)
  .then( hike => res.json(hike))
  .catch( err => next(err));
});

module.exports = hikeRouter;
