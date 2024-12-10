// backend/models/userDefinedJSON.js
const mongoose = require('mongoose');

const userDefinedJSONSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jsonData: { type: Object, required: true },  // 存储用户定义的 JSON 数据
}, { timestamps: true });

const UserDefinedJSON = mongoose.model('UserDefinedJSON', userDefinedJSONSchema);
module.exports = UserDefinedJSON;
