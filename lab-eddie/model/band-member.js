'use strict';

const uuid = require('uuid/v4');
const storage = require('../lib/storage');
const createError = require('http-errors');
const debug = require('debug')('app:band-members');

const BandMember = module.exports = function(first, last, ...instruments) {
  debug('member constructor');
  if(arguments.length < 3) return new Error('Expected at least3 arguments');

  this.first = first;
  this.last = last;
  this.instruments = instruments;
  this.id = uuid();

};

BandMember.fetchMember = function(id) {
  debug('fetchMember');
  return storage.fetchItem('bandMember', id);
};

BandMember.createMember = function(...params) {
  debug('createMember');
  try {
    let member = new BandMember(...params);
    return storage.createItem('bandMember', member);
  } catch(err) {
    return Promise.reject(createError(400, err.message));
  }
};

BandMember.deleteMember = function(id) {
  debug('deleteMember');

  return storage.deleteItem('bandMember', id);
}

BandMember.updateMember = function(..._member) {
  debug('updateMember');

  let id = _member.shift();
  _member = new BandMember(..._member);
  _member.id = id;


  return storage.fetchItem('bandMember', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( member => {
    for (var key in member) {
      if (key === 'id') continue;
      if (_member[key]) member[key] = _member[key];
    }
    return storage.createItem('bandMember', member);
  });
};

BandMember.fetchAll = function() {
  debug('fetchAll');
  return storage.fetchItem('bandMember');
};
