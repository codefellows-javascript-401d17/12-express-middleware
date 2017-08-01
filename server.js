const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const debug = require('debug')('shoe:server');
const morgan = require('morgan');
const Shoe = require('./model/shoe.js');
const shoeRouter = require('./route/shoe_router');

app.use(morgan('dev'));
app.use(shoeRouter);


app.listen(PORT, function(req, rsp) {
  console.log(`listening on port ${PORT}`);
  
})