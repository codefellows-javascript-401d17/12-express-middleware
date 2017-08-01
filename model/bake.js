'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('bake:bake');
const storage = require('../lib/storage.js');

const Bake = module.exports = function(bakedGood, description, calories) {
  if (!bakedGood) throw createError(400, 'expected baked good');
  if (!description) throw createError(400, 'expected description');
  if (!calories) throw createError(400, 'expected expected calories');

  this.id = uuidv4();
  this.bakedGood = bakedGood;
  this.description = description;
  this.calories = calories;
};

Bake.createBakedGood = function(_bake) {
  debug('createBakedGood');

  try {
    let bake = new Bake(_bake.bakedGood, _bake.description, _bake.calories);
    return storage.createItem('bake', bake);
  } catch (err) {
    return Promise.reject(err);
  }
};

Bake.fetchBakedGood = function(id) {
  debug('fetchBakedGood');

  return storage.fetchItem('bake', id);
};

Bake.deleteBakedGood = function(id) {
  debug('deleteBakedGood');

  return storage.deleteItem('bake', id);
};

