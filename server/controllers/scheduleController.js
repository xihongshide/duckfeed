var async = require('async');
const { body, check, validationResult } = require('express-validator');
var dateDiff = require('../uti/dateDiff');

var Schedule = require('../models/schedule');

module.exports.all = function(req, res, next) {
    // list all schedule
    Schedule.find({}, 'user food startDate endDate feedAmount duckAmount time location active')
        .exec(function(err, schedule) {
            if (err) {
                return next(err);
            }

            res.status(200).json(schedule);
        });
};

module.exports.add = [
    //validate fields
    body('food', 'Food is required.').isLength({min: 1}).trim().escape(),
    body('startDate', 'StartDate is required.').isLength({min: 1}).trim().escape(),
    body('endDate', 'EndDate Amout is required.').isLength({min: 1}).trim().escape(),
    body('feedAmount', 'Feed Amount Amount is required.').isLength({min: 1}).trim().escape(),
    body('duckAmount', 'Duck Amount is required.').isLength({min: 1}).trim().escape(),
    body('time', 'Feed Time is required.').isLength({min: 1}).trim().escape(),
    body('location', 'location is requireed').isLength({min: 1}).trim().escape(),
    (req, res, next) => {
        const err = validationResult(req);

        if (!err.isEmpty()) {
            return res.status(400).json({ err: err.array() });
        }

        if (dateDiff(new Date(req.body.startDate), new Date(req.body.endDate)) < 0) {
            return res.status(400).json({ err: [{msg: 'Start Date should be before End Date'}] });
        }

        var today = new Date();
        if (dateDiff(today, new Date(req.body.startDate)) < 0) {
            return res.status(400).json({ err: [{msg: 'Start Date should after today'}] });
        }

        const schedule = new Schedule({
            user: req.params.userName,
            food: req.body.food,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            feedAmount: req.body.feedAmount,
            duckAmount: req.body.duckAmount,
            location: req.body.location,
            time: req.body.time,
            active: true,
        });

        schedule.save(function(err) {
            if (err) {
                return next(err);
            }
            res.status(200).json(schedule);
        });
    }
];

module.exports.update = [
    // Validate fields.
    body('food', 'Food is required.').isLength({min: 1}).trim().escape(),
    body('feedAmount', 'Feed Amount is required.').isLength({min: 1}).trim().escape(),
    body('duckAmount', 'Duck Amount is required.').isLength({min: 1}).trim().escape(),
    body('location', 'location is required.').isLength({min: 1}).trim().escape(),
    (req, res, next) => {
        const err = validationResult(req);
        console.log(req.body);

        if (!err.isEmpty()) {
            return res.status(400).json({ err: err.array() });
        }

        if (dateDiff(new Date(req.body.startDate), new Date(req.body.endDate)) < 0) {
            return res.status(400).json({ err: [{msg: 'Start Date should be before End Date'}] });
        }

        var today = new Date();
        if (dateDiff(today, new Date(req.body.startDate)) < 0) {
            return res.status(400).json({ err: [{msg: 'Start Date should after today'}] });
        }

        const schedule = {
            food: req.body.food,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            feedAmount: req.body.feedAmount,
            duckAmount: req.body.duckAmount,
            location: req.body.location,
            time: req.body.time,
        };

        // update schedule
        Schedule.findByIdAndUpdate(req.body.id, {"$set": schedule}, {}, function(err) {
            if (err) {
                return next(err);
            }
            res.status(200).json(schedule);
        });
    }
];

module.exports.delete = function(req, res, next) {
    Schedule.findByIdAndRemove(req.body.id)
        .exec(function(err, schedules) {
            if (err) {
                return next(err);
            }

            res.status(200).json("success");
        });
};
