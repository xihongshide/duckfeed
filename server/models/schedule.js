var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    user: {
        type: String,
        ref: "User",
        required: true
    },
    food: {
        type: String,
        ref: "Food",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
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
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        ref: "Location",
        required: true
    },
    active: {
        type: Boolean,
    }
});

module.exports=mongoose.model('schedule', ScheduleSchema);
