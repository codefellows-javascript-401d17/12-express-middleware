'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('shoe.js:shoe');
const storage = require('../lib/storage.js');

const Shoe = module.exports = function (name, content) {
  debug('shoe constructor');

  if (!name) throw new Error('expected name');
  if (!content) throw new Error('expected content');

  this.id = uuidv4();
  this.name = name;
  this.content = content;
};

Shoe.createShoe = function (_shoe) {
  debug('createShoe');

  try {
    let shoe = new Shoe(_shoe.name, _shoe.content);
    return storage.createItem('shoe', shoe);
  } catch (err) {
    return Promise.reject(err);
  }
}

Shoe.fetchShoe = function (id) {
  debug('fetchShoe');
  return storage.fetchItem('shoe', id);
}

Shoe.updateShoe = function (id, _shoe) {
  debug('updateShoe');

  return storage.fetchItem('shoe', id)
    .catch(err => Promise.reject(createError(404, err.message)))
    .then(shoe => {
      for (var prop in shoe) {
        if (prop === 'id') continue;
        if (_shoe[prop]) shoe[prop] = _shoe[prop];
      }
      return storage.createItem('shoe', shoe);
    });
}

Shoe.deleteShoe = function (id) {
  debug('deleteShoe');
  return storage.deleteItem('shoe', id);
}

Shoe.fetchIDs = function () {
  debug('fetchIDs');
  return storage.availIDs('shoe');
}
