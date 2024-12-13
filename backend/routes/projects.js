const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const User = require('../models/user');
const UserGroup = require('../models/userGroup');

/**
 * @swagger
 * /api/v1/projects:
 *   get:
 *     summary: 获取所有项目
 *     responses:
 *       200:
 *         description: 返回项目列表
 *       500:
 *         description: 获取项目失败
 */
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('created_by', 'username')
      .populate('userGroup', 'groupName');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

/**
 * @swagger
 * /api/v1/projects:
 *   post:
 *     summary: 创建新项目
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   created_by:
 *                     type: string
 *                   userGroup:
 *                     type: string
 *     responses:
 *       201:
 *         description: 项目创建成功
 *       400:
 *         description: 请求字段缺失或无效
 *       500:
 *         description: 创建项目失败
 */
router.post('/', async (req, res) => {
  try {
    const { name, description, created_by, userGroup } = req.body.data;
    const user = await User.findOne({ username: created_by });
    const group = await UserGroup.findOne({ groupName: userGroup });

    if (!user || !group) {
      return res.status(400).json({ error: 'Invalid created_by or userGroup' });
    }

    const newProject = new Project({
      name,
      description,
      created_by: user._id,
      userGroup: group._id,
    });

    await newProject.save();
    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   put:
 *     summary: 更新项目
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
 *               data:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   created_by:
 *                     type: string
 *                   userGroup:
 *                     type: string
 *     responses:
 *       200:
 *         description: 项目更新成功
 *       400:
 *         description: 请求字段无效
 *       404:
 *         description: 项目未找到
 *       500:
 *         description: 更新项目失败
 */
router.put('/:id', async (req, res) => {
  try {
    const { name, description, created_by, userGroup } = req.body.data;
    const user = await User.findOne({ username: created_by });
    const group = await UserGroup.findOne({ groupName: userGroup });

    if (!user || !group) {
      return res.status(400).json({ error: 'Invalid created_by or userGroup' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, created_by: user._id, userGroup: group._id },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   delete:
 *     summary: 删除项目
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 项目删除成功
 *       404:
 *         description: 项目未找到
 *       500:
 *         description: 删除项目失败
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
