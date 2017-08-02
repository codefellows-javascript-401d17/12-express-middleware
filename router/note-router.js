'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:note-router');

const Note = require('../model/note.js');

const noteRouter = module.exports = new Router();

noteRouter.post('/api/note', jsonParser, (req, res, next) => {
  debug('POST: /api/note');

  Note.createNote(req.body)
  .then((note) => res.json(note))
  .catch((err) => next(err));
});

noteRouter.get('/api/note/:id', (req, res, next) => {
  debug('GET: /api/note/:id');

  Note.fetchNote(req.params.id)
  .then((note) => res.json(note))
  .catch((err) => next(err));
});

noteRouter.get('/api/note', (req, res, next) => {
  debug('GET: /api/note');

  Note.fetchIDs()
  .then((ids) => res.json(ids))
  .catch((err) => next(err));
});

noteRouter.put('/api/note', jsonParser, (req, res, next) => {
  debug('PUT: /api/note');

  Note.updateNote(req.query.id, req.body)
  .then((note) => res.json(note))
  .catch((err) => next(err));
});

noteRouter.delete('/api/note/:id', (req, res, next) => {
  debug('DELETE: /api/note');

  Note.deleteNote(req.params.id)
  .catch((err) => next(err));
});
