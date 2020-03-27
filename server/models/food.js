var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: { unique: true }
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('food', FoodSchema);
