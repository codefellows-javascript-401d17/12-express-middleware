const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const debug = require('debug')('shoe:server');
const morgan = require('morgan');
const Shoe = require('./model/shoe.js');

let blacknikes = new Shoe('nike', 'black')
Shoe.createShoe(blacknikes);



app.listen(PORT, function(req, rsp) {
  console.log(`listening on port ${PORT}`);
  
})