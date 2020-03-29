var async = require('async');
const { body, check, validationResult } = require('express-validator');

var Location = require('../models/location');

module.exports.all = function(req, res, next) {
    // list all locations
    Location.find({}, 'name')
        .exec(function(err, locations) {
            if (err) {
                return next(err);
            }

            res.status(200).json(locations);
        });
};

module.exports.add = [
    //validate fields
    body('name', 'Name is required.').isLength({min: 1}).trim().escape(),
    (req, res, next) => {
        const err = validationResult(req);

        if (!err.isEmpty()) {
            return res.status(400).json({ err: err.array() });
        }

        const {name, description} = req.body;

        // find the location by name
        Location.findOne({name: req.body.name,}).exec(function(err, found) {
            if (err) {
                return next(err);
            }

            if (found) {
                res.status(400).json({
                    errors: {msg: 'oops... The location is already in the list.'}
                });
            }

            let location = new Location({
                name: req.body.name,
            });

            location.save(function(err) {
                if (err) {
                    return next(err);
                }
                res.status(200).json(location);
            });
        });
    }
];

module.exports.delete = [
    // Validate fields.
    body('name', 'Name is required.').isLength({min: 1}).trim().escape(),
    (req, res, next) => {
        const err = validationResult(req);

        if (!err.isEmpty()) {
            res.status(400).json({err: err.array()});
        }

        const filter = { name: req.body.name };

        // delete location
        Location.findOneAndRemove(filter, {}, function(err) {
            if (err) {
                return next(err);
            }

            res.status(200).json(filter);
        });
    }
];
