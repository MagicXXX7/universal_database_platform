// backend/models/role.js
const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    unique: true
  },
  permissions: {
    type: [String],
    required: true
  },
  associatedUserGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserGroup', // 关联用户组
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Role', RoleSchema);
