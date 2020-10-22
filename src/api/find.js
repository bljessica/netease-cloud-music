import request from '../common/js/request';

//发现：轮播图
function getBanner() {
    return request({
        url: '/banner',
        method: 'get'
    })
}

//发现：人气歌单推荐
function getSuggestHotMenu() {
    return request({
        url: '/personalized',
        method: 'get'
    })
}

//发现：每日推荐歌单
function getDailySuggestPlaylist() {
    return request({
        url: '/recommend/songs',
        method: 'get'
    })
}

//发现：音乐日历
function getCalendar() {
    return request({
        url: '/calendar',
        method: 'get'
    })
}

export {
    getBanner,
    getSuggestHotMenu,
    getDailySuggestPlaylist,
    getCalendar
}