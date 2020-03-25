/**
*Module dependencies
*/
var express = require('express');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require("passport");

/**
* Create app instance
*/
var app = express();

/**
* Module Variables
*/
var config = require('../config/config');
var port = process.env.PORT || 5000;
var env = config.env;
var userRouter = require('./routes/users');
var dbURL = config.dbURL;

/**
* Module Settings and Config
*/
app.set('port', port);
app.set('env', env);

/**
* Database
*/
mongoose.connect(dbURL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

/**
* Middleware
*/
// load static files
app.use(express.static(path.join(__dirname, 'client/build')));
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use(logger('dev'));
app.use(cookieParser());
app.use(bParser.json());
app.use(bParser.urlencoded({ extended: true }));

app.use(session({
  key: 'user_sid',
  secret:'qwertyuiop',
  resave: true,
  saveUninitialized: true,
  cookie: {expires: 1200000}
}));

// Passport middleware
app.use(passport.initialize());
// Passport config
require(".././config/passport")(passport);

/**
* Routes
*/
app.use('/users', userRouter);

/**
*Export Module
*/
module.exports = app;
