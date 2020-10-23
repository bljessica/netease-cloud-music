import request from '../common/js/request';

//歌单广场：获取歌单分类
function getCatlist(data) {
    return request({
        url: '/playlist/catlist',
        method: 'get',
        data: data
    })
}

//歌单广场：获取每日推荐歌单
function getRecommendPlaylists(data) {
    return request({
        url: '/recommend/resource',
        method: 'get',
        data: data
    })
}

//歌单广场：获取精品歌单
function getHighQualityPlaylists(data) {
    return request({
        url: '/top/playlist/highquality',
        method: 'get',
        data: data
    })
}

export {
    getCatlist,
    getRecommendPlaylists,
    getHighQualityPlaylists
}