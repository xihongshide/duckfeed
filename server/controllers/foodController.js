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
            return res.status(422).json({ errors: err.array() });
        }

        const {name, description} = req.body;

        // find the food by name
        Food.findOne({name: req.body.name,}).exec(function(err, found) {
            if (err) {
                return next(err);
            }

            if (found) {
                res.status(400).json({
                    errors: {msg: 'oops... The food is already in the list.'}
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
    body('name', 'Name is required.').isLength({min: 1}).trim().escape(),
    body('description', 'Description is required.').isLength({min: 1}).trim().escape(),
    (req, res, next) => {
        const err = validationResult(req);

        if (!err.isEmpty()) {
            res.status(422).json({error: err.array()});
        }

        const filter = { name: req.body.name, };
        const update = { description: req.body.description };
        const food = new Food({
            name: req.body.name,
            description: req.body.description,
        });

        // update food description
        Food.findOneAndUpdate(filter, update, {}, function(err) {
            if (err) {
                return next(err);
            }

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
            res.status(400).json({error: err.array()});
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
