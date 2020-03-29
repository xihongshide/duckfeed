module.exports = function dateDiff(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    console.log(a, b);
    var timeDiff = b.getTime() - a.getTime();
    var diffDays = timeDiff / (_MS_PER_DAY);
    return diffDays;
};
