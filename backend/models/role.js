// backend/models/role.js
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleName: { type: String, required: true, unique: true },  // 角色名称
  permissions: { type: [String], required: true },  // 角色的权限
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
