'use strict';

const express = require('express');
const debug = require('debug')('app:server');
const morgan = require('morgan');
const creatError = require('http-errors');
const PORT = process.env.PORT || 3000;
const app = express();

const myRouter = require('./lib/member-router.js');
const cors = require('./lib/cors.js');
const errors = require('./lib/errors.js');

app.use(morgan('dev'));
app.use(cors);
app.use(myRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(console.log('Server active: ', PORT));
})