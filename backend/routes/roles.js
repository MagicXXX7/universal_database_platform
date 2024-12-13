const express = require('express');
const router = express.Router();
const Role = require('../models/role');
const UserGroup = require('../models/userGroup');

/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     summary: 获取所有角色
 *     responses:
 *       200:
 *         description: 返回角色列表
 *       500:
 *         description: 获取角色失败
 */
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
});

/**
 * @swagger
 * /api/v1/roles:
 *   post:
 *     summary: 创建角色
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *               associatedUserGroup:
 *                 type: string
 *     responses:
 *       201:
 *         description: 角色创建成功
 *       400:
 *         description: 请求字段无效
 *       500:
 *         description: 创建角色失败
 */
router.post('/', async (req, res) => {
  try {
    const { roleName, permissions, associatedUserGroup } = req.body;

    if (associatedUserGroup) {
      const userGroup = await UserGroup.findById(associatedUserGroup);
      if (!userGroup) {
        return res.status(400).json({ error: `UserGroup with ID ${associatedUserGroup} not found` });
      }
    }

    const newRole = new Role({ roleName, permissions, associatedUserGroup });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create role' });
  }
});

/**
 * @swagger
 * /api/v1/roles/{id}:
 *   put:
 *     summary: 更新角色
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
 *               roleName:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *               associatedUserGroup:
 *                 type: string
 *     responses:
 *       200:
 *         description: 角色更新成功
 *       400:
 *         description: 请求字段无效
 *       404:
 *         description: 角色未找到
 *       500:
 *         description: 更新角色失败
 */
router.put('/:id', async (req, res) => {
  try {
    const { roleName, permissions, associatedUserGroup } = req.body;

    if (associatedUserGroup) {
      const userGroup = await UserGroup.findById(associatedUserGroup);
      if (!userGroup) {
        return res.status(400).json({ error: `UserGroup with ID ${associatedUserGroup} not found` });
      }
    }

    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      { roleName, permissions, associatedUserGroup },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json(updatedRole);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update role' });
  }
});

/**
 * @swagger
 * /api/v1/roles/{id}:
 *   delete:
 *     summary: 删除角色
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 角色删除成功
 *       404:
 *         description: 角色未找到
 *       500:
 *         description: 删除角色失败
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete role' });
  }
});

module.exports = router;
