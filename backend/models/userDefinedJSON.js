const mongoose = require('mongoose');

const UserDefinedJSONSchema = new mongoose.Schema({
  name: { type: String, required: true }, // JSON 的名称
  description: { type: String }, // 描述信息
  content: { type: mongoose.Schema.Types.Mixed, required: true }, // 存储任意 JSON 数据
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 创建者
}, { timestamps: true });

module.exports = mongoose.model('UserDefinedJSON', UserDefinedJSONSchema);
