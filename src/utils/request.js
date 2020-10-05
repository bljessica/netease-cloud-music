import axios from 'axios';

//创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    responseType: 'json',
    withCredentials: true,//允许带cookie
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
});

//axios请求拦截器
service.interceptors.request.use(
    //在发送请求之前做什么
    config => {
        // 一般是在登录完成之后，将用户的token通过localStorage或者cookie存在本地，
        //然后用户每次在进入页面的时候，会首先从本地存储中读取token，如果token存在说明用户已经登陆过，
        //则更新vuex中的token状态。然后，在每次请求接口的时候，都会在请求的header中携带token，
        //服务器就可以根据你携带的token来判断你的登录是否过期，如果没有携带，则说明没有登录过。
        //如果有token,就给头部带上token
        //网易云api自动加上了cookies验证信息
        // if(localStorage.getItem('X-Token')) {
        //     config.headers['X-Token'] = localStorage.getItem('X-Token');
        // }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

//axios响应拦截器
service.interceptors.response.use(
    response => {
        if(response.status === 200) {
            return Promise.resolve(response);
        }
        //未授权
        else if (response.status === 401) {
            localStorage.removeItem('X-token');
            this.$router.push('/login');
        }
        else {
            return Promise.reject(response);
        }
    },
    error => {
        //返回接口返回的错误信息
        return Promise.reject(error);
    }
)

export default service;