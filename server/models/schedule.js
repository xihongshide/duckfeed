var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Schedule = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    Food: {
        type: Schema.Types.ObjectId,
        ref: "Food",
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
    time: new Schema({
        hour: {
            type: Number
        },
        minute: {
            type: Number
        }
    }),
    User: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports=mongoose.model('Schedule', ScheduleSchema);
