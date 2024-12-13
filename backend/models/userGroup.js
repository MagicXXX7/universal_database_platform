// models/userGroup.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserGroupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('UserGroup', UserGroupSchema);
