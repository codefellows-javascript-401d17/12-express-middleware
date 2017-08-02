'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(name, type, gen) {
  if(!name)throw new Error('expect Pokemon name');
  if(!type)throw new Error('expected Pokemon type');
  if(!gen)throw new Error('expected a generation');

  this.id = uuidv4();
  this.name = name;
  this.type = type;
  this.gen = gen;
};