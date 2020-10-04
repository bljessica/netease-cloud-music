import axios from 'axios';
import { getToken } from '../utils/auth';
import { Message } from 'element-ui'; 

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
// service.interceptors.request.use(
//     config => {
//         //在发送请求之前做什么
//         if(congif.method === 'POST') {
//             //序列化
//             config.data = JSON.stringify(config.data);
//         }
//         else {
//             if(this.$store.getters.token) {
//                 // 一般是在登录完成之后，将用户的token通过localStorage或者cookie存在本地，
//                 //然后用户每次在进入页面的时候，会首先从本地存储中读取token，如果token存在说明用户已经登陆过，
//                 //则更新vuex中的token状态。然后，在每次请求接口的时候，都会在请求的header中携带token，
//                 //服务器就可以根据你携带的token来判断你的登录是否过期，如果没有携带，则说明没有登录过。
//                 //如果有token,就给头部带上token
//                 config.headders['X-Token'] = getToken();
//             }
//         }
//         return config;
//     },
//     error => {
//         //请求错误自定义
//         Message({
//             message: error,
//             type: 'warning',
//             duration: 0
//         });
//         return Promise.reject(error.data);
//     }
// )

//axios响应拦截器
service.interceptors.response.use(
    response => {
        if(response.status === 200) {
            return Promise.resolve(response);
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