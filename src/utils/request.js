import axios from 'axios';

// axios.create 返回 function
const service = axios.create({
    baseURL: 'https://apis.imooc.com',
    timeout: 5000
});

// 对响应的拦截器进行封装
service.interceptors.response.use(
    // 插入自定义的拦截器
    response => {
        if (response.status === 200 && response.data) {
            // 请求通过
            return response.data;
        } else {
            return Promise.reject(new Error('请求失败'));
        }
    },
    error => {
        return Promise.reject(error);
    }
);

export default service;
