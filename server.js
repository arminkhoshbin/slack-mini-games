'use strict';

var express = require('express');
var app = express();

var https = require('https');

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

  var req = https.request({
   	host: server.address().address,
    path: config.webhook_url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }, function(res){
      res.setEncoding('utf8');
      res.on('data', function(chunk){
        console.log('response', chunk);
      });
 	});

 	// write data to request body
	req.write(data);
	req.end();
  
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});