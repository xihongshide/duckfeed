var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Feed = new Schema({
    time: {
        type: Date,
        required: true
    },
    feedAmout: {
        type: Number,
        required: true
    },
    duckAmount: {
        type: Number,
        required: true
    },
    Food: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true
    },
    location: new Schema({
        longitude: {
            type: Number
        },
        latitude: {
            type: Number
        }
    }),
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports=mongoose.model('Feed', FeedSchema);
