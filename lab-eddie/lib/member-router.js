'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const BandMember = require('../model/band-member.js');
const debug = require('debug');
const memberRouter = new Router();


memberRouter.post('/api/band-member/*', jsonParser, function(req, res, next) {
  debug('POST: api/band-member');
  console.log(req.params[0].split('/'))
  BandMember.createMember(...req.params[0].split('/'))
  .then(member => res.json(member))
  .catch(err => next(err));
});

memberRouter.get('/api/band-member/:id', function(req, res, next) {
  debug('GET: api/band-member/:id');


  BandMember.fetchMember(req.params.id)
  .then(member => res.json(member))
  .catch(err => next(err));
});

memberRouter.get('/api/band-member', function(req, res, next) {
  debug('GET: api/band-member/');

  BandMember.fetchAll()
  .then(band => res.json(band))
  .catch(err => next(err));
});

memberRouter.put('/api/band-member/:id/:name/:first/:last:/instruments', jsonParser, function(req, res, next){
  debug('PUT: api/band-member');

  BandMember.updateMember(...req.params)
  .then(member = res.json(member))
  .catch(err => next(err));

});

memberRouter.delete('/api/band-member/:id', function(req, res, next) {
  debug('DELETE: api/band-member/:id');
  BandMember.deleteMember(req.params.id)
  .then(member => res.json(member))
  .catch(err => next(err));
})


module.exports = memberRouter;
