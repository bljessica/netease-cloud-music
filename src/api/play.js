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

//播放：获取歌曲url
function getPlaySongUrl(data) {
    return request({
        url: '/song/url',
        method: 'get',
        data: data
    })
}

//播放：获取歌词
function getLyrics(data) {
    return request({
        url: '/lyric',
        method: 'get',
        data: data
    })
}

//播放：获取歌曲评论
function getSongComments(data) {
    return request({
        url: '/comment/music',
        method: 'get',
        data: data
    })
}

export {
    getSongComments,
    getPlayRecord,
    getPlaylistDetail,
    getPlaySongDetail,
    getPlaySongUrl,
    getLyrics
}