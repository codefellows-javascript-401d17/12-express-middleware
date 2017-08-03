'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('pokemon:pokemon');
const storage = require('../lib/storage.js');

const Pokemon = module.exports = function(name, type, gen) {
  if(!name) return Promise.reject(createError(400, 'expected name'));
  if(!type) return Promise.reject(createError(400, 'expected type'));
  if(!gen) return Promise.reject(createError(400, 'expected gen'));

  this.id = uuidv4();
  this.name = name;
  this.type = type;
  this.gen = gen;
};

Pokemon.createPokemon = function(_pokemon) {
  debug('createPokemon');

  try {
    let pokemon = new Pokemon(_pokemon.name, _pokemon.type, _pokemon.gen);
    return storage.createItem('pokemon', pokemon);
  } catch(err) {
    return Promise.reject(err);
  }
};

Pokemon.fetchPokemon = function(id) {
  debug('fetchPokemon');
  return storage.fetchItem('pokemon', id);
};

Pokemon.updatePokemon = function(id, _pokemon) {
  debug('update pokemon');

  return storage.fetchItem('pokemon', id)
  .catch( err=> Promise.reject(createError(404, err.message)))
  .then (pokemon => {
    for (var prop in pokemon) {
      if(prop === 'id')continue;
      if (_pokemon[prop]) pokemon[prop] = _pokemon[prop];
    }
    return storage.createItem('pokemon', pokemon);
  });
};

Pokemon.deletePokemon = function(id) {
  debug('deletePokemon');
  return storage.deleteItem('pokemon', id);
};

Pokemon.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('pokemon');
};