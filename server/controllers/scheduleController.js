var async = require('async');
const { body, check, validationResult } = require('express-validator');

var Schedule = require('../models/feed');

module.exports.all = function(req, res, next) {
    // list all schedule
    Schedule.find({}, 'user food startDate endDate feedAmount duckAmount, time')
        .exec(function(err, schedule) {
            if (err) {
                return next(err);
            }

            res.status(200).json(schedule);
        });
};

module.exports.add = [
    //validate fields
    body('user', 'User is required.').isLength({min: 1}).trim().escape(),
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
            return res.status(422).json({ errors: err.array() });
        }

        const schedule = new Schedule({
            user: req.body.user,
            food: req.body.food,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            feedAmount: req.body.feedAmount,
            duckAmount: req.body.duckAmount,
            time: req.body.time,
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
    body('user', 'User is required.').isLength({min: 1}).trim().escape(),
    body('food', 'Food is required.').isLength({min: 1}).trim().escape(),
    body('startDate', 'StartDate is required.').isLength({min: 1}).trim().escape(),
    body('endDate', 'EndDate Amout is required.').isLength({min: 1}).trim().escape(),
    body('feedAmount', 'Feed Amount Amount is required.').isLength({min: 1}).trim().escape(),
    body('duckAmount', 'Duck Amount is required.').isLength({min: 1}).trim().escape(),
    body('time', 'Feed Time is required.').isLength({min: 1}).trim().escape(),
    (req, res, next) => {
        const err = validationResult(req);

        if (!err.isEmpty()) {
            res.status(422).json({error: err.array()});
        }

        const schedule = {
            user: req.body.user,
            food: req.body.food,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            feedAmount: req.body.feedAmount,
            duckAmount: req.body.duckAmount,
            time: req.body.time,
        };

        // update schedule
        Schedule.findByIdAndUpdate(req.query.id, schedule, {}, function(err) {
            console.log(schedule);
            if (err) {
                return next(err);
            }
            res.status(200).json(schedule);
        });
    }
];

module.exports.delete = function(req, res, next) {
    schedule.findByIdAndRemove(req.query.id)
        .exec(function(err, schedules) {
            if (err) {
                return next(err);
            }

            res.status(200).json(schedules);
        });
};
