const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }], // 关联到角色
}, { timestamps: true });

module.exports = mongoose.model('Permission', PermissionSchema);
