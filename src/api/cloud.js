import request from '../utils/request';

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

export {
    getHotWall,
    likeComment
}