import request from '../common/js/request';

//播放：获取歌单分类
function getCatlist(data) {
    return request({
        url: '/playlist/catlist',
        method: 'get',
        data: data
    })
}

export {
    getCatlist
}