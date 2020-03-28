var async = require('async');
const { body, check, validationResult } = require('express-validator');

var Food = require('../models/food');

module.exports.all = function(req, res, next) {
    // list all foods
    Food.find({}, 'name description')
        .exec(function(err, foods) {
            if (err) {
                return next(err);
            }

            res.status(200).json(foods);
        });
};

module.exports.add = [
    //validate fields
    body('name', 'Name is required.').isLength({min: 1}).trim().escape(),
    body('description', 'Description is required.').isLength({min: 1}).trim().escape(),
    (req, res, next) => {
        const err = validationResult(req);

        if (!err.isEmpty()) {
            return res.status(400).json({ err: err.array()});
        }

        const {name, description} = req.body;

        // find the food by name
        Food.findOne({name: req.body.name,}).exec(function(err, found) {
            if (err) {
                return next(err);
            }

            if (found) {
                let error = [{msg: 'oops... The food is already in the list.'}];
                res.status(400).json({
                    err: error,
                });
            }

            let food = new Food({
                name: req.body.name,
                description: req.body.description
            });

            food.save(function(err) {
                if (err) {
                    return next(err);
                }
                res.status(200).json(food);
            });
        });
    }
];

module.exports.update = [
    // Validate fields.
    body('id', 'Food Id is Missing. Please refresh...').isLength({min: 1}).trim().escape(),
    body('name', 'Name is required.').isLength({min: 1}).trim().escape(),
    body('description', 'Description is required.').isLength({min: 1}).trim().escape(),
    (req, res, next) => {
        const err = validationResult(req);

        if (!err.isEmpty()) {
            res.status(400).json({err: err.array()});
        }

        const filter = { name: req.body.name, };

        const food = {
            name: req.body.name,
            description: req.body.description,
        };
        // update food description
        Food.findByIdAndUpdate(req.body.id, {"$set": food}, {}, function(err) {
            if (err) {
                return next(err);
            }
            food._id = req.body.id;
            res.status(200).json(food);
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

        const filter = { name: req.body.name, };

        // delete food
        Food.findOneAndRemove(filter, function(err) {
            if (err) {
                return next(err);
            }

            res.status(200).json(filter);
        });
    }
];
