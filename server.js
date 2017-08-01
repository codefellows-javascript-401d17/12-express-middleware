const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const debug = require('debug')('shoe');

app.listen(PORT, function(req, rsp) {
  console.log(`listening on port ${PORT}`);
  
})