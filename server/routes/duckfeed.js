var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwt_decode = require('jwt-decode');
var validator = require("validator");

const keys = require("../../config/config");

var foodController = require('../controllers/foodController');
var feedController = require('../controllers/feedController');
var scheduleController = require('../controllers/scheduleController');

var jwtTokenChecker = (req, res, next) => {
    const token = req.headers.jwt_token;
    if(validator.isJWT(token) && jwt.verify(token, keys.secretOrKey)) {
        req.params.userName = jwt_decode(req.headers.jwt_token).name;
        return next();
    }
    else {
        res.status(401).json({error: 'Unauthorized'});
    }
};

// food curd apis
router.get('/food/all', foodController.all);
router.post('/food/add', jwtTokenChecker, foodController.add);
router.post('/food/update', jwtTokenChecker, foodController.update);
router.post('/food/delete', jwtTokenChecker, foodController.delete);

// feed curd apis
router.get('/feed/all', feedController.all);
router.post('/feed/add', jwtTokenChecker, feedController.add);
router.post('/feed/update', jwtTokenChecker, feedController.update);
router.post('/feed/delete',  jwtTokenChecker, feedController.delete);

// schedule curd apis
router.get('/schedule/all', scheduleController.all);
router.post('/schedule/add', jwtTokenChecker, scheduleController.add);
router.post('/schedule/update', jwtTokenChecker, scheduleController.update);
router.post('/schedule/delete', jwtTokenChecker, scheduleController.delete);

module.exports=router;
