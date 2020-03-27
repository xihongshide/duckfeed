var async = require('async');
const { body, check, validationResult } = require('express-validator');

var Feed = require('../models/feed');

module.exports.all = function(req, res, next) {
    // list all feeds
    Feed.find({}, 'user food time feedAmout duckAmount location')
        .exec(function(err, feeds) {
            if (err) {
                return next(err);
            }

            res.status(200).json(feeds);
        });
};

module.exports.add = [
    //validate fields
    body('user', 'User is required.').isLength({min: 1}).trim().escape(),
    body('food', 'Food is required.').isLength({min: 1}).trim().escape(),
    body('time', 'Time is required.').isLength({min: 1}).trim().escape(),
    body('feedAmout', 'Feed Amout is required.').isLength({min: 1}).trim().escape(),
    body('duckAmount', 'Duck Amount is required.').isLength({min: 1}).trim().escape(),
    body('location', 'location is required.').isLength({min: 1}).trim().escape(),
    (req, res, next) => {
        const err = validationResult(req);

        if (!err.isEmpty()) {
            return res.status(422).json({ errors: err.array() });
        }

        const feed = new Feed({
            user: req.body.user,
            food: req.body.food,
            time: req.body.time,
            feedAmout: req.body.feedAmout,
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
    body('user', 'User is required.').isLength({min: 1}).trim().escape(),
    body('food', 'Food is required.').isLength({min: 1}).trim().escape(),
    body('time', 'Time is required.').isLength({min: 1}).trim().escape(),
    body('feedAmout', 'Feed Amout is required.').isLength({min: 1}).trim().escape(),
    body('duckAmount', 'Duck Amount is required.').isLength({min: 1}).trim().escape(),
    body('location', 'location is required.').isLength({min: 1}).trim().escape(),
    (req, res, next) => {
        const err = validationResult(req);

        if (!err.isEmpty()) {
            res.status(422).json({error: err.array()});
        }

        const feed = {
            user: req.body.user,
            food: req.body.food,
            time: req.body.time,
            feedAmout: req.body.feedAmout,
            duckAmount: req.body.duckAmount,
            location: req.body.location,
        };

        // update feed
        Feed.findByIdAndUpdate(req.query.id, feed, {}, function(err) {
            console.log(feed);
            if (err) {
                return next(err);
            }
            res.status(200).json(feed);
        });
    }
];

module.exports.delete = function(req, res, next) {
    Feed.findByIdAndRemove(req.query.id)
        .exec(function(err, feeds) {
            if (err) {
                return next(err);
            }

            res.status(200).json("feeds");
        });
};
