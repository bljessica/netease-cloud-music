import request from '../utils/request';

//发现页轮播图
function getBanner() {
    return request({
        url: '/banner',
        method: 'get'
    })
}

export {
    getBanner
}