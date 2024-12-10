// backend/models/project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'UserGroup' },  // 关联用户组
  formData: { type: mongoose.Schema.Types.Mixed }, // 存储自定义表单数据
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
