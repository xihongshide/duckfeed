var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Food = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

module.exports=mongoose.model('Food', FoodSchema);
