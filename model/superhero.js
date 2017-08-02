'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('superhero:superhero');
const storage = require('../lib/storage.js');

const Superhero = module.exports = function(name, comicUni) {
  debug('superhero constructor');

  if (!name) throw new Error('expected name');
  if (!comicUni) throw new Error('expected comicUni');

  this.id = uuidv4();
  this.name = name;
  this.comicUni = comicUni;
};

Superhero.createSuperhero = function(_superhero) {
  debug('createSuperhero');

  try {
    let superhero = new Superhero(_superhero.name, _superhero.comicUni);
    return storage.createItem('superhero', superhero);
  } catch (err) {
    return Promise.reject(err);
  }
};

Superhero.fetchSuperhero = function(id) {
  debug('fetchSuperhero');
  return storage.fetchItem('superhero', id);
};

Superhero.updateSuperhero = function(id, _superhero) {
  debug('updateSuperhero');

  return storage.fetchItem('superhero', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( superhero => {
    for (var prop in superhero) {
      if (prop === 'id') continue;
      if (_superhero[prop]) superhero[prop] = _superhero[prop];
    }
    return storage.createItem('superhero', superhero);
  });
};

Superhero.deleteSuperhero = function(id) {
  debug('deleteSuperhero');
  return storage.deleteItem('superhero', id);
};

Superhero.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('superhero');
};
