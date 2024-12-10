// backend/models/sound.js
const mongoose = require('mongoose');

const soundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  soundFile: { type: String, required: true },  // 声音文件的路径
  description: { type: String },
}, { timestamps: true });

const Sound = mongoose.model('Sound', soundSchema);
module.exports = Sound;
