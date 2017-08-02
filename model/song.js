'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('storage:song');
const storage = require('../lib/storage.js');

const Song = module.exports = function(name, band, year) {
  debug('song contructor');

  if (!name) return Promise.reject(createError(400, 'expected name'));
  if (!band) return Promise.reject(createError(400, 'expected band'));
  if (!year) return Promise.reject(createError(400, 'expected year'));

  this.id = uuidv4();
  this.name = name;
  this.band = band;
  this.year = year;
};

Song.createSong = function(_song) {
  debug('createSong');

  try {
    let song = new Song(_song.name, _song.band, _song.year);
    return storage.createItem('song', song);
  } catch (err) {
    return Promise.reject(err);
  }
};

Song.fetchSong = function(id) {
  debug('fetchSong');
  return storage.fetchItem('song', id);
};

Song.updateSong = function (id, _song) {
  debug('updateSong');

  return storage.fetchItem('song', id)
  .then( song => {
    for (var prop in song) {
      if (prop === 'id') continue;
      if (_song[prop]) song[prop] = _song[prop];
    }
    return storage.createItem('song', song);
  })
  .catch( err => Promise.reject(createError(404, err.message)));
};

Song.deleteSong = function(id) {
  debug('deleteSong');
  return storage.deleteItem('song', id);
};

Song.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('song');
};
