var fs = require("fs");
var http = require("http");
var https = require("https");
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require("./config.json");

var credentials = {
  key: fs.readFileSync(config.ssl_key),
  cert: fs.readFileSync(config.ssl_cert)
};

var httpsServer = https.createServer(credentials, app);

var tests = require('./handlers/tests');
var utils = require('./handlers/utils');
var records = require('./handlers/records');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(function(req, res, next) {
	var uuid = req.cookies.uuid;
	if (!uuid) {
		res.cookie('uuid', utils.uuid_get('00:01:02:03:04:05'), { maxAge: 900000 });
	}
	next();
});

app.use("/", express.static(__dirname + '/html'));


/*
    Register callbacks
 */
app.get('/test', tests.test);
app.post('/recorder', records.recorder);

httpsServer.listen(config.port_number, function() {
	console.log("https listening 0.0.0.0:" + config.port_number);
});
