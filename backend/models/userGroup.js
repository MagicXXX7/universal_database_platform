// backend/models/userGroup.js
const mongoose = require('mongoose');

const userGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // 用户组成员
}, { timestamps: true });

const UserGroup = mongoose.model('UserGroup', userGroupSchema);
module.exports = UserGroup;
