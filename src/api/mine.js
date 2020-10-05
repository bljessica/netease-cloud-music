import request from '../utils/request';

//我的页：头像、昵称、等级信息
function getUserInfo(data) {
    return request({
        url: '/user/detail',
        method: 'post',
        data: data
    })
}

export {
    getUserInfo
}