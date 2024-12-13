const express = require('express');
const router = express.Router();
const Permission = require('../models/permission');
const Role = require('../models/role');

// 获取所有权限
router.get('/', async (req, res) => {
  try {
    const permissions = await Permission.find().populate('roles', 'roleName');
    res.json(permissions);
  } catch (error) {
    console.error('Error fetching permissions:', error);
    res.status(500).json({ error: 'Failed to fetch permissions' });
  }
});

// 创建权限
router.post('/', async (req, res) => {
  try {
    const { name, description, roles } = req.body;

    const existingRoles = await Role.find({ _id: { $in: roles } });
    if (existingRoles.length !== roles.length) {
      return res.status(400).json({ error: 'Invalid roles provided' });
    }

    const newPermission = new Permission({ name, description, roles });
    await newPermission.save();
    res.status(201).json(newPermission);
  } catch (error) {
    console.error('Error creating permission:', error);
    res.status(500).json({ error: 'Failed to create permission' });
  }
});

// 更新权限
router.put('/:id', async (req, res) => {
  try {
    const { name, description, roles } = req.body;

    const existingRoles = await Role.find({ _id: { $in: roles } });
    if (existingRoles.length !== roles.length) {
      return res.status(400).json({ error: 'Invalid roles provided' });
    }

    const updatedPermission = await Permission.findByIdAndUpdate(
      req.params.id,
      { name, description, roles },
      { new: true }
    );

    if (!updatedPermission) {
      return res.status(404).json({ error: 'Permission not found' });
    }

    res.json(updatedPermission);
  } catch (error) {
    console.error('Error updating permission:', error);
    res.status(500).json({ error: 'Failed to update permission' });
  }
});

// 删除权限
router.delete('/:id', async (req, res) => {
  try {
    const deletedPermission = await Permission.findByIdAndDelete(req.params.id);
    if (!deletedPermission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    res.json({ message: 'Permission deleted successfully' });
  } catch (error) {
    console.error('Error deleting permission:', error);
    res.status(500).json({ error: 'Failed to delete permission' });
  }
});

module.exports = router;
