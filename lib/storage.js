'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Pr'});
const createError = require('http-errors');
const debug = require('debug')('note:storage');

module.exports = exports = {};

exports.createItem = (schemaName, item) => {
  debug('create item');

  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!item) return Promise.reject(createError(400, 'expected item'));

  return fs.writeFilePr(`${__dirname}/../data/${schemaName}/${item.id}.json`, JSON.stringify(item))
  .then(() => item)
  .catch((err) => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = (schemaName, id) => {
  debug('fetch item');

  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.readFilePr(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then((data) => {
    try{
      let item = JSON.parse(data.toString());
      return item;
    }catch(err){
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch((err) => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = (schemaName, id) => {
  debug('delete item');

  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.unlinkPr(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch((err) => Promise.reject(createError(404, err.message)));
};

exports.availIDs = (schemaName) => {
  debug('avail IDs');

  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));

  return fs.readdirPr(`${__dirname}/../data/${schemaName}`)
  .then((files) => files.map((name) => name.split('.json')[0]))
  .catch((err) => Promise.reject(createError(404, err.message)));
};
