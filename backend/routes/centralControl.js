const express = require('express');
const router = express.Router();
const CentralControl = require('../models/centralControl');

// 获取所有中控设备
router.get('/', async (req, res) => {
  try {
    const controls = await CentralControl.find();
    res.status(200).json(controls);
  } catch (error) {
    console.error('Error fetching central controls:', error);
    res.status(500).json({ error: 'Failed to fetch central controls' });
  }
});

// 创建新的中控设备
router.post('/', async (req, res) => {
  try {
    const { name, description, config } = req.body;

    const newControl = new CentralControl({
      name,
      description,
      config,
    });

    await newControl.save();
    res.status(201).json(newControl);
  } catch (error) {
    console.error('Error creating central control:', error);
    res.status(500).json({ error: 'Failed to create central control' });
  }
});

// 更新中控设备
router.put('/:id', async (req, res) => {
  try {
    const { name, description, config } = req.body;

    const updatedControl = await CentralControl.findByIdAndUpdate(
      req.params.id,
      { name, description, config },
      { new: true }
    );

    if (!updatedControl) {
      return res.status(404).json({ error: 'Central control not found' });
    }

    res.status(200).json(updatedControl);
  } catch (error) {
    console.error('Error updating central control:', error);
    res.status(500).json({ error: 'Failed to update central control' });
  }
});

// 删除中控设备
router.delete('/:id', async (req, res) => {
  try {
    const deletedControl = await CentralControl.findByIdAndDelete(req.params.id);

    if (!deletedControl) {
      return res.status(404).json({ error: 'Central control not found' });
    }

    res.status(200).json({ message: 'Central control deleted successfully' });
  } catch (error) {
    console.error('Error deleting central control:', error);
    res.status(500).json({ error: 'Failed to delete central control' });
  }
});

module.exports = router;
