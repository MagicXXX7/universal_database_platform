const express = require('express');
const UserGroup = require('../models/userGroup');
const router = express.Router();

/**
 * @swagger
 * /api/v1/userGroups:
 *   get:
 *     summary: 获取所有用户组
 *     responses:
 *       200:
 *         description: 返回用户组列表
 *       500:
 *         description: 获取用户组失败
 */
router.get('/', async (req, res) => {
  try {
    const userGroups = await UserGroup.find();
    res.status(200).json(userGroups);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user groups.' });
  }
});

/**
 * @swagger
 * /api/v1/userGroups:
 *   post:
 *     summary: 创建用户组
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: 用户组创建成功
 *       500:
 *         description: 创建用户组失败
 */
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newUserGroup = new UserGroup({ name, description });
    await newUserGroup.save();
    res.status(201).json(newUserGroup);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user group.' });
  }
});

/**
 * @swagger
 * /api/v1/userGroups/{id}:
 *   delete:
 *     summary: 删除用户组
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 用户组删除成功
 *       404:
 *         description: 用户组未找到
 *       500:
 *         description: 删除用户组失败
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await UserGroup.findByIdAndDelete(id);
    res.status(200).json({ message: 'User group deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user group.' });
  }
});

module.exports = router;
