var scheduleEmiter = require('node-schedule');// doc: https://www.npmjs.com/package/node-schedule
var Schedule = require('./models/schedule');
var Feed = require('./models/feed');

const dateDiff = function(date1, date2) {
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    return Difference_In_Time / (1000 * 3600 * 24);
};

const feedFromSchedule = function(date, schedule){
    return new Feed({
        user:schedule.user,
        food:schedule.food,
        time: date,
        feedAmount: schedule.feedAmount,
        duckCount: schedule.duckCount,
        location: schedule.location,
    });
};

const scheduleFeed = function(){
    // update sechdule's status to active or inactive everynight
    // at 00:00:00 at the schedule's time zone
    scheduleEmiter.scheduleJob('00 00 00 * * *', function(){
        // findout all active schedules
        Schedule.find({active: true}, function (err, schedules) {
            if (err) { return next(err); }
            // loop through schedules
            const today = new Date();
            schedules.map(schedule => {
                // if today is the schedule startDate start a feed after its start time(hour and minite)
                if(dateDiff(today, item.startDate) == 0){
                    scheduleEmiter.scheduleJob('*' + item.time.substring(0, 2) + ' ' + item.time.substring(2, 4) + ' * * * *', function(){
                        const feed  = feedFromSchedule(today, item);

                        feed.save(function(err) {
                            if (err) {
                                return next(err);
                            }
                        });
                    });
                }

                // set schedule to inactive if endDate is large than today
                if(dateDiff(today, item.endDate) == 0) {
                    item.active = false;
                }
            });
        });
        done('Completed all the schedules');
    });
};
