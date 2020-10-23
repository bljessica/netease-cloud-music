import request from '../request';

//云村：获取云村热评
function getHotWall() {
    return request({
        url: '/comment/hotwall/list',
        method: 'get'
    })
}

//云村：给评论点赞
function likeComment(data) {
    return request({
        url: '/comment/like',
        method: 'get',
        data: data
    })
}

//云村：获取关注的人
function getFollows(data) {
    return request({
        url: '/user/follows',
        method: 'post',
        data: data
    })
}

export {
    getHotWall,
    likeComment,
    getFollows
}