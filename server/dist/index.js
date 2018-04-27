'use strict';

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var router = require('./router');

var app = express();

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
var port = process.env.PORT || 3090;
var server = http.createServer(app);
server.listen(port);
console.log('Server listening on:' + port);