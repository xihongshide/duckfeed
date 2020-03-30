/**
*Module dependencies
*/
var app = require('./app');
var http = require('http');

/**
*Create server instance
*/
var server = http.createServer(app);

/**
*Module Variables
*/
var port = process.env.PORT || 5000;

/**
*Schedule Feed Event Emiter
*/
var scheduleEmiter = require('./scheduleEventEmiter');

/**
*Bind server to port
*/
server.listen(port);

console.log('Server is listening on port ' + port);
