'use strict';

const express = require('express');
const debug = require('debug')('app:server');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

const app = express();







app.listen(PORT, () => {
  debug(console.log('Server active: ', PORT));
})