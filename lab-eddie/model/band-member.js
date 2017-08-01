'use strict';

const uuid = require('uuid/v4');
const storage = require('../lib/storage');
const debug = require('debug')('app:band-members')

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
  storage.fetchItem('bandMember', id);
};

BandMember.createMember = function(...params) {
  debug('createMember');
  try {
    let member = new BandMember(...params);
    return storage.createItem('bandMember', member);
  } catch(err) {
    return Promise.reject(err);
  }
};

BandMember.deleteMember = function(id) {
  debug('deleteMember');

  storage.deleteItem('bandMember', id);
}