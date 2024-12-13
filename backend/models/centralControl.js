const mongoose = require('mongoose');

const CentralControlSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 中控设备名称
  description: { type: String }, // 描述信息
  config: { 
    deviceType: { type: String, required: true }, // 设备类型（如 lighting, sensor 等）
    protocol: { type: String, required: true }, // 通信协议（如 MQTT, HTTP 等）
    status: { type: String, enum: ['active', 'inactive'], default: 'active' } // 状态
  },
}, { timestamps: true });

module.exports = mongoose.model('CentralControl', CentralControlSchema);
