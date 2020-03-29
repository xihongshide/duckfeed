var async = require('async');
const { body, check, validationResult } = require('express-validator');

var Feed = require('../models/feed');

module.exports.all = function(req, res, next) {
    // list all feeds
    Feed.find({}, 'user food time feedAmount duckAmount location')
        .exec(function(err, feeds) {
            if (err) {
                return next(err);
            }

            res.status(200).json(feeds);
        });
};

module.exports.add = [
    //validate fields
    body('food', 'Food is required.').isLength({min: 1}).trim().escape(),
    body('time', 'Time is required.').isLength({min: 1}).trim().escape(),
    body('feedAmount', 'Feed Amout is required.').isLength({min: 1}).trim().escape(),
    body('duckAmount', 'Duck Amount is required.').isLength({min: 1}).trim().escape(),
    body('location', 'location is required.').isLength({min: 1}).trim().escape(),
    (req, res, next) => {
        const err = validationResult(req);

        if (!err.isEmpty()) {
            return res.status(400).json({ err: err.array() });
        }

        const feed = new Feed({
            user: req.params.userName,
            food: req.body.food,
            time: req.body.time,
            feedAmount: req.body.feedAmount,
            duckAmount: req.body.duckAmount,
            location: req.body.location,
        });

        feed.save(function(err) {
            if (err) {
                return next(err);
            }
            res.status(200).json(feed);
        });
    }
];

module.exports.update = [
    // Validate fields.
    body('food', 'Food is required.').isLength({min: 1}).trim().escape(),
    body('time', 'Time is required.').isLength({min: 1}).trim().escape(),
    body('feedAmount', 'Feed Amount is required.').isLength({min: 1}).trim().escape(),
    body('duckAmount', 'Duck Amount is required.').isLength({min: 1}).trim().escape(),
    body('location', 'location is required.').isLength({min: 1}).trim().escape(),
    (req, res, next) => {
        const err = validationResult(req);

        if (!err.isEmpty()) {
            res.status(422).json({err: err.array()});
        }

        const feed = {
            food: req.body.food,
            time: req.body.time,
            feedAmount: req.body.feedAmount,
            duckAmount: req.body.duckAmount,
            location: req.body.location,
        };

        // update feed
        Feed.findByIdAndUpdate(req.body.id, {"$set": feed}, {}, function(err) {
            if (err) {
                return next(err);
            }
            res.status(200).json(feed);
        });
    }
];

module.exports.delete = function(req, res, next) {
    Feed.findByIdAndRemove(req.body.id)
        .exec(function(err, feeds) {
            if (err) {
                return next(err);
            }

            res.status(200).json("success");
        });
};
