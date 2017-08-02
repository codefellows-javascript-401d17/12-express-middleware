'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('car:car');
const storage = require('../lib/storage.js');

const Car = module.exports = function(make, model, year) {
  debug('note constructor');

  if (!make) throw new Error('expected make');
  if (!model) throw new Error('expected model');
  if (!year) throw new Error ('expected year');

  this.id = uuidv4();
  this.make = make;
  this.model = model;
  this.year = year;
};

Car.createCar = function(_car) {
  debug('createCar');

  try {
    let car = new Car(_car.make, _car.model, _car.year);
    return storage.createItem('car', car);
  } catch (err) {
    return Promise.reject(err);
  }
}

Car.fetchCar = function(id) {
  debug('fetchCar');
  return storage.fetchCar('car', id);
}

Car.updateCar = function(id, _car) {
  debug('updateCar');

  return storage.fetchItem('car', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( note => {
    for (var prop in car) {
      if (prop === 'id') continue;
      if (_car[prop]) car[prop] = _car[prop];
    }
    return storage.createItem('car', car);
  });
};

Car.deleteCar = function(id) {
  debug('deleteCar');
  return storage.deleteItem('car', id);
};

Car.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('car');
};
