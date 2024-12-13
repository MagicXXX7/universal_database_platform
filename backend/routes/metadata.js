// toutes/metadata.js
const express = require('express');
const router = express.Router();
const models = require('../models');

// 获取所有模型的元数据
router.get('/models', (req, res) => {
  try {
    const modelMetadata = Object.keys(models).map(modelName => {
      const model = models[modelName];
      const schemaPaths = model.schema.paths;

      // 提取字段信息
      const fields = Object.keys(schemaPaths).map(fieldName => {
        const field = schemaPaths[fieldName];
        return {
          name: fieldName,
          type: field.instance,
          required: field.isRequired || false,
        };
      });

      return {
        modelName,
        fields,
      };
    });

    res.json({ models: modelMetadata });
  } catch (error) {
    console.error('Error fetching model metadata:', error);
    res.status(500).json({ error: 'Failed to fetch model metadata' });
  }
});

module.exports = router;
