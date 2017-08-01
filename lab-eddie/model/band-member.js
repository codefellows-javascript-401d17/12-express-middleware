'use strict';

const uuid = require('uuid/v4');

const BandMember = module.exports = function(first, last, ...instruments) {

  this.first = first;
  this.last = last;
  this.instruments = instruments;
  this.id = uuid();

};

