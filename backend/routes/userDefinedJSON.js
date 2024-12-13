const express = require('express');
const router = express.Router();
const UserDefinedJSON = require('../models/userDefinedJSON');
const User = require('../models/user');

// 获取所有用户定义的 JSON
router.get('/', async (req, res) => {
  try {
    const jsonRecords = await UserDefinedJSON.find().populate('createdBy', 'username');
    res.status(200).json(jsonRecords);
  } catch (error) {
    console.error('Error fetching JSON records:', error);
    res.status(500).json({ error: 'Failed to fetch JSON records' });
  }
});

// 创建用户定义的 JSON
router.post('/', async (req, res) => {
  try {
    const { name, description, content, createdBy } = req.body;

    // 验证创建者用户是否存在
    const user = await User.findById(createdBy);
    if (!user) {
      return res.status(400).json({ error: 'Invalid user ID provided' });
    }

    const newJSON = new UserDefinedJSON({ name, description, content, createdBy });
    await newJSON.save();
    res.status(201).json(newJSON);
  } catch (error) {
    console.error('Error creating JSON record:', error);
    res.status(500).json({ error: 'Failed to create JSON record' });
  }
});

// 更新用户定义的 JSON
router.put('/:id', async (req, res) => {
  try {
    const { name, description, content } = req.body;
    const updatedJSON = await UserDefinedJSON.findByIdAndUpdate(
      req.params.id,
      { name, description, content },
      { new: true }
    );

    if (!updatedJSON) {
      return res.status(404).json({ error: 'JSON record not found' });
    }

    res.status(200).json(updatedJSON);
  } catch (error) {
    console.error('Error updating JSON record:', error);
    res.status(500).json({ error: 'Failed to update JSON record' });
  }
});

// 删除用户定义的 JSON
router.delete('/:id', async (req, res) => {
  try {
    const deletedJSON = await UserDefinedJSON.findByIdAndDelete(req.params.id);
    if (!deletedJSON) {
      return res.status(404).json({ error: 'JSON record not found' });
    }

    res.status(200).json({ message: 'JSON record deleted successfully' });
  } catch (error) {
    console.error('Error deleting JSON record:', error);
    res.status(500).json({ error: 'Failed to delete JSON record' });
  }
});

module.exports = router;
