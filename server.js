'use strict';

const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('bake:server');

const bakeRouter = require('./route/bake-router.js');
const cors = require('./lib/cors-middleware.js');
const jsonParser = require('body-parser').json();

const Bake = require('./model/bake.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.listen(PORT, () => {
  debug(`Server listening on PORT: ${PORT}`);
});