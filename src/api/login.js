import request from '../common/js/request';

//手机号登录
function phoneLogin(data) {
    return request({
        url: '/login/cellphone',
        method: 'post',
        data: data
    })
}

//邮箱登录
function emailLogin(data) {
    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}

export {
    phoneLogin,
    emailLogin
}