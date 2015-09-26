'use strict';

var express = require('express');
var app = express();
var Roller = new (require('./libs/roller'))();

app.post('/roll', function (req, res) {
  res.send(Roller.start());
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});