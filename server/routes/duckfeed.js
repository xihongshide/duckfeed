var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwt_decode = require('jwt-decode');
var validator = require("validator");
var keys = require("../../config/config");
var secretOrKey = process.env.JWT_KEY || keys.secretOrKey;

var foodController = require('../controllers/foodController');
var feedController = require('../controllers/feedController');
var scheduleController = require('../controllers/scheduleController');
var locationController = require('../controllers/locationController');

var jwtTokenChecker = (req, res, next) => {
    var token = req.headers.authorization.replace(/^Bearer\s/, '');
    if(validator.isJWT(token) && jwt.verify(token, secretOrKey)) {
        req.params.userName = jwt_decode(token).name;
        return next();
    }
    else {
        res.status(401).json({error: 'Unauthorized'});
    }
};

// food curd apis
router.get('/food/all', jwtTokenChecker, foodController.all);
router.post('/food/add', jwtTokenChecker, foodController.add);
router.post('/food/update', jwtTokenChecker, foodController.update);
router.post('/food/delete', jwtTokenChecker, foodController.delete);

// feed curd apis
router.get('/feed/all', jwtTokenChecker, feedController.all);
router.post('/feed/add', jwtTokenChecker, feedController.add);
router.post('/feed/update', jwtTokenChecker, feedController.update);
router.post('/feed/delete',  jwtTokenChecker, feedController.delete);

// schedule curd apis
router.get('/schedule/all', jwtTokenChecker, scheduleController.all);
router.post('/schedule/add', jwtTokenChecker, scheduleController.add);
router.post('/schedule/update', jwtTokenChecker, scheduleController.update);
router.post('/schedule/delete', jwtTokenChecker, scheduleController.delete);

// location list all, add, delete apis
router.get('/location/all', jwtTokenChecker, locationController.all);
router.post('/location/add', jwtTokenChecker, locationController.add);
router.post('/location/delete', jwtTokenChecker, locationController.delete);

module.exports=router;
