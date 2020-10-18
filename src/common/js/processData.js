function getCurrentTime(current) {
    //超过一分钟
    if(current > 60) {
        //超过十分钟
        if(current / 60 >= 10) {
            if((current % 60) < 10) {
                return Math.floor(current / 60) + ':0' + (current % 60);
            }
            return Math.floor(current / 60) + ':' + (current % 60);
        }
        else {
            if((current % 60) < 10) {
                return '0' + Math.floor(current / 60) + ':0' + (current % 60);
            }
            return '0' + Math.floor(current / 60) + ':' + (current % 60);
        }
    }
    else {
        if(current < 10) {
            return '00:0' + current;
        }
        return '00:' + current;
    }
}

function getLyricTime(time) {
    let times = time.split(':');
    return times[0] + ':' +times[1].substring(0, 2);
}

export {
    getCurrentTime,
    getLyricTime
}