const jwt = require('jsonwebtoken');
const User = require('../models/user'); // 假设有一个 User 模型来验证用户

const secretKey = 'your_secret_key'; // 用于签名 token 的密钥

// 登录并生成 JWT
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // 假设通过用户名和密码查找用户
    try {
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // 用户验证通过，生成 JWT
        const payload = { id: user._id, username: user.username, role: user.role };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        // 返回 token 给前端
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
