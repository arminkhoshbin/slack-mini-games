'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser());

var Roller = new (require('./libs/roller'))();

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.post('/roll', function (req, res) {
	console.log(req.body.user_name);
  //res.send(Roller.start());
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});