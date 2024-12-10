const express = require("express");
const Table = require("../models/table"); // 引入表模型
const router = express.Router();

// 获取所有记录
router.get("/", async (req, res) => {
  try {
    const records = await Table.find(); // 查询所有记录
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 创建新记录
router.post("/", async (req, res) => {
  try {
    const newRecord = new Table(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 更新记录
router.put("/:id", async (req, res) => {
  try {
    const updatedRecord = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 删除记录
router.delete("/:id", async (req, res) => {
  try {
    await Table.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
