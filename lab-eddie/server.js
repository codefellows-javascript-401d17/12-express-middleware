'use strict';

const express = require('express');
const debug = require('debug')('app:server');
const morgan = require('morgan');
const creatError = require('http-errors');
const PORT = process.env.PORT || 3000;


const app = express();

app.use(morgan('dev'));

app.listen(PORT, () => {
  debug(console.log('Server active: ', PORT));
})