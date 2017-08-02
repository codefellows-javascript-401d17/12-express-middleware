'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('hike:hike');
const storage = require('../lib/storage.js');

const Hike = module.exports = function(name, location) {
  debug('hike constructr');

  if(!name) throw new Error('expected name');
  if(!location) throw new Error('expected content');

  this.id = uuidv4();
  this.name = name;
  this.location = location;
};

Hike.createHike = function(_hike) {
  debug('createHike');

  try {
    let hike = new Hike(_hike.name, _hike.location);
    return storage.createItem('hike', hike);
  } catch (err) {
    return Promise.reject(err);
  }
};

Hike.fetchHike = function(id) {
  debug('fetch Hike ');
  return storage.fetchItem('hike', id);
};

Hike.updateHike = function(id, _hike) {
  debug('update hike');

  return storage.fetchItem('hike', id)
  .catch( err=> Promise.reject(createError(404, err.message)))
  .then (hike => {
    for (var prop in hike) {
      if(prop === 'id')continue;
      if (_hike[prop]) hike[prop] = _hike[prop];
    }
    return storage.createItem('hike', hike);
  });
};

Hike.deleteHike = function(id){
  debug('deleteHike');
  return storage.deleteItem('hike', id);
};

Hike.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('hike');
};
