import request from '../request';

//我的：头像、昵称、等级
function getUserInfo(data) {
    return request({
        url: '/user/detail',
        method: 'post',
        data: data
    })
}

//我的：喜欢音乐
function getLikeList(data) {
    return request({
        url: '/likelist',
        method: 'post',
        data: data
    })
}

//我的：用户歌单
function getPlayLists(data) {
    return request({
        url: '/user/playlist',
        method: 'post',
        data: data
    })
}


export {
    getUserInfo,
    getLikeList,
    getPlayLists
}