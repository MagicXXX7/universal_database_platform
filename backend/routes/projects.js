// backend/routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/project');  // 引入 Project 模型
const User = require('../models/user');  // 引入 User 模型
const UserGroup = require('../models/userGroup');  // 引入 UserGroup 模型

// 获取所有项目
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('created_by', 'username') // 填充 created_by 字段，只返回 username
      .populate('userGroup', 'groupName'); // 填充 userGroup 字段，只返回 groupName

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});


// 创建新项目
router.post('/', async (req, res) => {
  try {
    const { name, description, created_by, userGroup } = req.body.data;

    // 检查必填字段
    if (!name || !description || !created_by || !userGroup) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 查找创建者用户
    const user = await User.findOne({ username: created_by });
    if (!user) {
      return res.status(400).json({ error: `User '${created_by}' not found` });
    }

    // 查找用户组
    const group = await UserGroup.findOne({ groupName: userGroup });
    if (!group) {
      return res.status(400).json({ error: `UserGroup '${userGroup}' not found` });
    }

    // 创建新项目
    const newProject = new Project({
      name,
      description,
      created_by: user._id,
      userGroup: group._id,
    });

    await newProject.save();
    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// 更新项目
router.put('/:id', async (req, res) => {
  try {
    const { name, description, created_by, userGroup } = req.body.data;

    // 查找用户和用户组
    const user = await User.findOne({ username: created_by });
    const group = await UserGroup.findOne({ groupName: userGroup });

    if (!user || !group) {
      return res.status(400).json({ error: 'Invalid created_by or userGroup' });
    }

    const updatedData = {
      name,
      description,
      created_by: user._id,
      userGroup: group._id,
    };

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// 删除项目
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
