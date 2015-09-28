'use strict';

var express = require('express');
var app = express();

var https = require('https');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

var config = require('./config/config');

var webhook;
if (typeof process.env.WEBHOOK_URL === 'undefined') {
	webhook = config.webhook_url;
} else {
	webhook = process.env.WEBHOOK_URL;
}

var slackToken;

var Roller = new (require('./libs/roller'))();

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.post('/roll', function (req, res) {
	var number = Roller.start();
	var slackToken = req.body.token;

	if (process.env.ROLLER_TOKEN == slackToken || config.ROLLER_TOKEN == slackToken) {

		var data = JSON.stringify({
	    text: req.body.user_name + ' rolled number ' + number,
	    username: 'Slack Mini Games',
	    channel: '#' + req.body.channel_name,
	    icon_emoji: ":slack:",
	  });

		// send post request to webhook
	  var req = https.request({
	   	host: req.body.team_domain + '.slack.com',
	    path: webhook,
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json',
	      'Content-Length': data.length,
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

		res.end('');
	}
  
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});