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
var port = app.get('port');
var env = app.get('env');

/**
*Schedule Feed Event Emiter
*/
var scheduleEmiter = require('./scheduleEventEmiter');

/**
*Bind server to port
*/
server.listen(port);

console.log('Server is listening on port ' + port);
