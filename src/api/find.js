import request from '../utils/request';

//发现页轮播图
function getBanner() {
    return request({
        url: '/banner',
        method: 'get'
    })
}

//发现页：人气歌单推荐
function getSuggestHotMenu() {
    return request({
        url: '/personalized',
        method: 'get'
    })
}

export {
    getBanner,
    getSuggestHotMenu
}