'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require ('debug')('house:house');
const storage = require('../lib/storage.js');

const House = module.exports = function(name, seat, region, words) {
  debug('house constructor');

  if(!name) throw new Error('expected name');
  if(!seat) throw new Error('expected seat');
  if(!region) throw new Error('expected region');
  if(!words) throw new Error('expected words');

  this.id = uuidv4();
  this.name = name;
  this.seat = seat;
  this.region = region;
  this.words = words;
};

House.createHouse = function(_house) {
  debug('createHouse');

  try {
    let house = new House(_house.name, _house.seat, _house.region, _house.words);
    return storage.createItem('house', house);
  } catch(err) {
    return Promise.reject(err);
  }
};

House.fetchHouse = function(id) {
  debug('fetchHouse');
  return storage.fetchItem('house', id);
};

House.updateHouse = function(id, _house) {
  debug('updateHouse');

  return storage.fetchItem('house', id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(house => {
    for(var prop in house) {
      if(prop === 'id') continue;
      if(_house[prop]) house[prop] = _house[prop];
    }
    return storage.createItem('house', house);
  });
};

House.deleteHouse = function(id) {
  debug('deleteHouse');

  return storage.deleteItem('house', id);
};

House.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('house');
};
