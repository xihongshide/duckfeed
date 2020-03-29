var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const FeedSchema = new Schema({
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    food: {
        type: String,
        ref: "Food",
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    feedAmount: {
        type: Number,
        required: true
    },
    duckAmount: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        ref: "Location",
        required: true
    }
});

module.exports=mongoose.model('feed', FeedSchema);
