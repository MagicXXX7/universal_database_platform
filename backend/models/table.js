const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fields: [
        {
            name: { type: String, required: true },
            type: { type: String, required: true },
            required: { type: Boolean, default: false },
            defaultValue: { type: mongoose.Schema.Types.Mixed },
            description: { type: String },
        }
    ]
});

module.exports = mongoose.model('Table', tableSchema);
