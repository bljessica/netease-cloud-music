import request from '../utils/request';

//搜索：默认搜索关键词
function getDefault() {
    return request({
        url: '/search/default',
        method: 'get'
    })
}

//搜索：搜索
function search(data) {
    return request({
        url: '/search',
        method: 'get',
        data: data
    })
}

export {
    getDefault,
    search
}