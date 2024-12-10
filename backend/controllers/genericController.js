const getModel = require('../models/genericModel');

exports.getAll = async (req, res) => {
    const { module } = req.params;
    try {
        const Model = getModel(module, req.body.fields || []);
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

exports.create = async (req, res) => {
    const { module } = req.params;
    const { fields, data } = req.body;
    try {
        const Model = getModel(module, fields);
        const newItem = new Model(data);
        await newItem.save();
        res.json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create data' });
    }
};

exports.update = async (req, res) => {
    const { module, id } = req.params;
    const { fields, data } = req.body;
    try {
        const Model = getModel(module, fields);
        const updatedItem = await Model.findByIdAndUpdate(id, data, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update data' });
    }
};

exports.delete = async (req, res) => {
    const { module, id } = req.params;
    try {
        const Model = getModel(module, []);
        await Model.findByIdAndDelete(id);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete data' });
    }
};
