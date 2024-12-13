const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Role = require('../models/role');

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: 获取所有用户
 *     responses:
 *       200:
 *         description: 返回用户列表
 *       500:
 *         description: 获取用户失败
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('role');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: 创建用户
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: 用户创建成功
 *       400:
 *         description: 请求字段无效
 *       500:
 *         description: 创建用户失败
 */
router.post('/', async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const foundRole = await Role.findOne({ roleName: role });

    if (!foundRole) {
      return res.status(400).json({ error: `Role '${role}' not found` });
    }

    const newUser = new User({
      username,
      password,
      email,
      role: foundRole._id,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: 更新用户角色
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: 用户更新成功
 *       400:
 *         description: 请求字段无效
 *       404:
 *         description: 用户未找到
 *       500:
 *         description: 更新用户失败
 */
router.put('/:id', async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const foundRole = await Role.findOne({ roleName: role });

    if (!foundRole) {
      return res.status(400).json({ error: `Role '${role}' not found` });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, password, email, role: foundRole._id },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: 删除用户
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 用户删除成功
 *       404:
 *         description: 用户未找到
 *       500:
 *         description: 删除用户失败
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
