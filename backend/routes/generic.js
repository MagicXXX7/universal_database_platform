// backend/routes/generic.js
const express = require('express');
const router = express.Router();

// 动态创建数据表（仅为示例，可根据需求扩展）
router.post('/create-table', async (req, res) => {
  try {
    const { tableName, fields } = req.body; // 获取表单字段
    const newTable = new mongoose.Schema(fields);
    const Table = mongoose.model(tableName, newTable);
    res.status(201).json({ message: `Table ${tableName} created successfully`, table: Table });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create table' });
  }
});

// 获取所有表
router.get('/get-tables', async (req, res) => {
  try {
    const tables = await mongoose.connection.db.listCollections().toArray();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
});

module.exports = router;
