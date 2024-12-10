const axios = require('axios');

// 获取存储在 localStorage 中的 token
const token = localStorage.getItem('authToken');

// 后端 API 地址
const BASE_URL = 'http://10.11.100.90:3000/api/v1/users';

// POST 数据
const payload = {
    fields: ['username', 'password', 'email'],
    data: {
        username: 'john_doe',
        password: '123456',
        email: 'john@example.com',
    },
};

// 发送 POST 请求
axios.post(BASE_URL, payload, {
    headers: {
        Authorization: `Bearer ${token}`, // 添加 JWT 到请求头
    },
})
    .then(response => {
        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);
    })
    .catch(error => {
        console.error('Error Status:', error.response?.status || 'N/A');
        console.error('Error Message:', error.response?.data || error.message);
    });
