//秒数->XX:XX
function secondsToStr(current) {
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
 
//获取歌词的时间
function getLyricTime(time) {
    let times = time.split(':');
    return times[0] + ':' +times[1].substring(0, 2);
}

//XX:XX->秒数
function strToSeconds(time) {
    let times = time.split(':');
    let minutes = Number(times[0]), seconds = Number(times[1]);
    return minutes * 60 + seconds;
}

//歌曲播放量
function getPlayNum(playCount) {
    if(playCount >= 100000000) {
        return (playCount / 100000000).toFixed(1) + '亿';
    }
    else if(playCount >= 10000) {
        return Math.round(playCount / 10000) + '万';
    }
    else {
        return playCount;
    }
}

export {
    secondsToStr,
    getLyricTime,
    strToSeconds,
    getPlayNum
}