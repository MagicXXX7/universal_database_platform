// backend/models/centralControl.js
const mongoose = require('mongoose');

const centralControlSchema = new mongoose.Schema({
  systemName: { type: String, required: true },
  configData: { type: Object, required: true },  // 系统配置数据
}, { timestamps: true });

const CentralControl = mongoose.model('CentralControl', centralControlSchema);
module.exports = CentralControl;
