import request from '../utils/request';

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

export {
    getBanner,
    getSuggestHotMenu
}