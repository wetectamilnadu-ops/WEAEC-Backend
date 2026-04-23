const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const newsSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    date: { type: String, default: () => new Date().toLocaleDateString() },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', newsSchema);
