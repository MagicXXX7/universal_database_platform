// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');  // 引入 User 模型
const Role = require('../models/role');  // 引入 Role 模型

// 获取所有用户
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// 创建新用户
router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body); // 打印接收到的数据
    const { username, password, email, role, phone } = req.body.data;

    if (!username || !password || !email || !role || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 查找角色
    const foundRole = await Role.findOne({ roleName: role });
    if (!foundRole) {
      return res.status(400).json({ error: `Role '${role}' not found` });
    }

    const newUser = new User({
      username,
      password,
      email,
      role: foundRole._id,
      phone,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});


// 获取单个用户
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// 更新用户
router.put('/:id', async (req, res) => {
  try {
    const { username, password, email, role, phone } = req.body.data;
    const updatedData = { username, password, email, role, phone };

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// 删除用户
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
