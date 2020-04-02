var async = require('async');
const { body, check, validationResult } = require('express-validator');

var FoodType = require('../models/foodType');

module.exports.all = function(req, res, next) {
    // list all foodTypes
    FoodType.find({}, 'name')
        .exec(function(err, foodTypes) {
            if (err) {
                return next(err);
            }

            res.status(200).json(foodTypes);
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

        const {name} = req.body;

        // find the foodType by name
        FoodType.findOne({name: req.body.name,}).exec(function(err, found) {
            if (err) {
                return next(err);
            }

            if (found) {
                res.status(400).json({
                    errors: {msg: 'oops... The food type is already in the list.'}
                });
            }

            let foodType = new FoodType({
                name: req.body.name,
            });

            foodType.save(function(err) {
                if (err) {
                    return next(err);
                }
                res.status(200).json(foodType);
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

        // delete foodType
        FoodType.findOneAndRemove(filter, {}, function(err) {
            if (err) {
                return next(err);
            }

            res.status(200).json(filter);
        });
    }
];
