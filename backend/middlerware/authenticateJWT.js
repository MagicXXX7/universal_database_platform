const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // 提取 Bearer Token
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const user = jwt.verify(token, secretKey); // 验证 Token
        req.user = user; // 将解析后的用户信息存入请求
        next(); // 调用下一个中间件
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
};
