const mongoose = require('mongoose');

const modelCache = {}; // 缓存动态生成的模型

function getModel(moduleName, schemaFields) {
    if (modelCache[moduleName]) {
        return modelCache[moduleName];
    }

    const schemaDefinition = schemaFields.reduce((acc, field) => {
        acc[field] = { type: String, required: true };
        return acc;
    }, { createdAt: { type: Date, default: Date.now } });

    const schema = new mongoose.Schema(schemaDefinition);
    const model = mongoose.model(moduleName, schema);
    modelCache[moduleName] = model;
    return model;
}

module.exports = getModel;
