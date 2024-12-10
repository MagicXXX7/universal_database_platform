// backend/routes/roles.js
const express = require('express');
const router = express.Router();
const Role = require('../models/role');  // 引入 Role 模型

// 获取所有角色
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
});

// 创建新角色
router.post('/', async (req, res) => {
  try {
    const { roleName, permissions } = req.body;
    const newRole = new Role({ roleName, permissions });
    await newRole.save();
    res.status(201).json({ message: 'Role created successfully', role: newRole });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ error: 'Failed to create role' });
  }
});

// 更新角色
router.put('/:id', async (req, res) => {
  try {
    const { roleName, permissions } = req.body;
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, { roleName, permissions }, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json({ message: 'Role updated successfully', role: updatedRole });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ error: 'Failed to update role' });
  }
});

// 删除角色
router.delete('/:id', async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ error: 'Failed to delete role' });
  }
});

module.exports = router;
