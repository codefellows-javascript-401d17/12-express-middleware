'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('song:song-router');
const Song = require('../model/song.js');
const songRouter = new Router();

songRouter.post('/api/song', jsonParser, function(req, res, next){
  debug('POST: /api/song');

  Song.createSong(req.body)
  .then( song => res.json(song))
  .catch( err => next(err));
});

songRouter.get('/api/song/:id', function(req, res, next) {
  debug('GET: /api/song/:id');

  Song.fetchSong(req.params.id)
  .then( song => res.json(song))
  .catch( err => next(err));
});

songRouter.get('/api/song', function(req, res, next) {
  debug('GET: /api/song');

  Song.fetchIDs()
  .then( ids => res.json(ids))
  .catch( err => next(err));
});

songRouter.put('/api/song/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/song/:id');

  Song.updateSong(req.params.id, req.body)
  .then( song => res.json(song))
  .catch( err => next(err));
});

module.exports = songRouter;
