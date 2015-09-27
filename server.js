'use strict';

var express = require('express');
var app = express();

var request = require('request');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

var config = require('./config/config');

var slackToken;

var Roller = new (require('./libs/roller'))();

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.post('/roll', function (req, res) {
	var number = Roller.start();

	var data = JSON.stringify({
    text: number,
    username: 'slack-mini-games',
    channel: req.body.channel_name,
  });

  request({
	  url: config.webhook_url,
	  headers: {
    	'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
	  method: 'POST',
	  body: data,
	}, function (err, res, body) {
	  if (!err && res.statusCode == 200) {
	    console.log(body);
	  }
	});

	//console.log(req.body.user_name);
  
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});