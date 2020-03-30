/**
*Module dependencies
*/
var express = require('express');
var logger = require('morgan');
var path = require('path');
var bParser = require('body-parser');
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
var env = config.env;
var dbURL = process.env.MONGO_URI || config.dbURL;

// routes
var userRouter = require('./routes/users');
var duckfeedRouter = require('./routes/duckfeed');

/**
* Module Settings and Config
*/
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

app.use(logger('dev'));
app.use(bParser.json());
app.use(bParser.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());
// Passport config
require(".././config/passport")(passport);

/**
* Router
*/
app.use('/users', userRouter);
app.use('/duckfeed', duckfeedRouter);

// if production, load static files
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/../build')));
    // Handles any requests that don't match the ones above
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname+'/../build/index.html'));
    });
}
/**
*Export Module
*/
module.exports = app;
