import request from '../utils/request';

//播放：获取播放记录
function getPlayRecord(data) {
    return request({
        url: '/user/record',
        method: 'get',
        data: data
    })
}

//播放：获取歌单详情
function getPlaylistDetail(data) {
    return request({
        url: '/playlist/detail',
        method: 'get',
        data: data
    })
}

//播放：获取歌曲详情
function getPlaySongDetail(data) {
    return request({
        url: '/song/detail',
        method: 'get',
        data: data
    })
}

export {
    getPlayRecord,
    getPlaylistDetail,
    getPlaySongDetail
}