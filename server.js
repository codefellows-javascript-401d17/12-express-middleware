const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const debug = require('debug')('shoe:server');
const morgan = require('morgan');
const Shoe = require('./model/shoe.js');
const shoeRouter = require('./route/shoe_router');
const cors = require('./lib/cors-middleware');
const errors = require('./lib/error-middleware');

app.use(cors);
app.use(morgan('dev'));
app.use(shoeRouter);
app.use(errors);

app.listen(PORT, function(req, rsp) {
  console.log(`listening on port ${PORT}`);
  
})