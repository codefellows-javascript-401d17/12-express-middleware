const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('shoe:shoe-router');
const Shoe = require('../model/shoe.js');
const shoeRouter = new Router();

shoeRouter.post('/api/shoe', jsonParser, function (req, res, next) {
  debug('POST: /api/shoe');

  Shoe.createShoe(req.body)
    .then(shoe => res.json(shoe))
    .catch(err => next(err));
});

shoeRouter.get('/api/shoe/:id', function (req, res, next) {
  debug('GET: /api/shoe/:id');

  Shoe.fetchShoe(req.params.id)
    .then(shoe => res.json(shoe))
    .catch(err => next(err));
});

shoeRouter.get('/api/shoe', function (req, res, next) {
  debug('GET: /api/shoe');

  Shoe.fetchIDs()
    .then(ids => res.json(ids))
    .catch(err => next(err));
});

shoeRouter.put('/api/shoe', jsonParser, function (req, res, next) {
  debug('PUT: /api/shoe');

  Shoe.updateShoe(req.query.id, req.body)
    .then(shoe => res.json(shoe))
    .catch(err => next(err));
});

shoeRouter.delete('/api/shoe', function (req, res, next) {
  debug('DELETE: /api/shoe');
  Shoe.deleteShoe(req.query.id)
    .then((shoe) => res.json(shoe))
    .catch(err => next(err));
});

module.exports = shoeRouter;