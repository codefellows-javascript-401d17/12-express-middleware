'use strict';

const fs = require('fs');
const debug = require('debug')('book:fs-promises');

let fsPromises = {};

module.exports = fsPromises;

fsPromises.createDirectory = function(path) {
  debug('createDirectory');
  return new Promise(function(resolve, reject) {
    fs.mkdir(path, function(error) {
      if (error && error.code !== 'EEXIST') {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

fsPromises.writeFile = function(path, item) {
  debug('writeFile');  
  return new Promise(function(resolve, reject) {
    fs.writeFile(path, item, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

fsPromises.readFile = function(path) {
  debug('readFile');  
  return new Promise((resolve, reject) => {
    fs.readFile(path, function(error, buffer) {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(buffer.toString()));
      }
    });
  });
};

fsPromises.deleteFile = function(path) {
  debug('deleteFile');  
  return new Promise((resolve, reject) => {
    fs.unlink(path, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

fsPromises.exists = function(path) {
  debug('exists');
  return new Promise(function(resolve) {
    fs.exists(path, function(exists) {
      resolve(exists);
    });
  });
};

fsPromises.readDirectory = function(path) {
  debug('readDirectory');
  return new Promise(function(resolve, reject) {
    fs.readdir(path, function(error, files) {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    });
  });
};


