'use strict'

const debug = require('debug')('app:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');

const storage = module.exports = {};

storage.fetchItem = function(category, id) {
  debug('fetchItem')
  if(!category) return Promise.reject(createError(404, 'Expeced Category'));
  if(!id) return storage.fetchAll(category);

  return fs.readFileProm(`${__dirname}/../data/${category}/${id}.json`)
  .then(data => {
    try {
      return JSON.parse(data.toString());
    } catch (err) {
      return Promise.reject(createError(400, 'Bad Request'));
    }
  })
  .catch(err => Promise.reject(createError(404, 'resource not found')));
};

storage.createItem = function(category, item) {
  debug('createItem');
  if(!category) return Promise.reject(createError(404, 'Expected Category'));
  if(!item) return Promise.reject(createError(404, 'Expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${category}/${item.id}.json`, json)
  .then(() => item)
  .catch(err => Promise.reject(createError(500, err.message)));

};

storage.deleteItem = function(category, id) {
  debug('deleteItem')
  if(!category) return Promise.reject(createError(404, 'Expected Category'));
  if(!id) return Promise.reject(createError(404, 'Expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${category}/${id}.json`)
  .catch(err => Promise.reject(createError(404, 'Item not found')));

};

storage.fetchAll = function(category) {
  if(!category) Promise.reject(createError(404, 'Expected Category'));
  console.log(category)

  return fs.readdirProm(`${__dirname}/../data/${category}`)
  .then(dir => dir.map(file => file.split('.json')[0]))
  .catch(err => Promise.reject(createError(404, err.message)));
};