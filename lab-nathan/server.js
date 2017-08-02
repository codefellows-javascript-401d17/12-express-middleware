'use strict';

const morgan = require('morgan');
const debug = require('debug')('book:server');
const express = require('express');

const bookRoutes = require('./route/book-routes.js');
const errors = require('./middleware/error.js');
const cors = require('./middleware/cors.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(bookRoutes);
app.use(errors);

app.listen(PORT, function() {
  debug(`Server started on port ${PORT}.`);
});