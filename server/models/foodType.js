var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const FoodTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: { unique: true }
    }
});

module.exports = mongoose.model('foodType', FoodTypeSchema);
