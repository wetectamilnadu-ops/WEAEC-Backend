const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const gallerySchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, required: true },
    src: { type: String, required: true },
    title: { type: String, required: true, default: 'New Event' },
    description: { type: String, default: '' },
    date: { type: String, default: () => new Date().toLocaleDateString() },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', gallerySchema);
