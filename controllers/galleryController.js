const Gallery = require('../models/Gallery');

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
const getGalleryItems = async (req, res) => {
    try {
        const gallery = await Gallery.find().sort({ createdAt: -1 });
        const mappedGallery = gallery.map(item => ({
            id: item.id,
            src: item.src,
            title: item.title,
            description: item.description,
            date: item.date,
            createdAt: item.createdAt
        }));
        
        res.status(200).json(mappedGallery);
    } catch (error) {
        console.error('Error fetching gallery:', error);
        res.status(500).json({ error: 'Failed to fetch gallery items' });
    }
};

// @desc    Create a gallery item
// @route   POST /api/gallery
// @access  Public
const createGalleryItem = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'Image file is required' });

        const newItem = new Gallery({
            src: `http://localhost:5000/uploads/${req.file.filename}`,
            title: req.body.title || 'New Event',
            description: req.body.description || '',
            date: req.body.date || new Date().toLocaleDateString(),
        });

        const savedItem = await newItem.save();
        
        res.status(201).json({
            id: savedItem.id,
            src: savedItem.src,
            title: savedItem.title,
            description: savedItem.description,
            date: savedItem.date,
            createdAt: savedItem.createdAt
        });
    } catch (error) {
        console.error('Error creating gallery item:', error);
        res.status(500).json({ error: 'Failed to create gallery item' });
    }
};

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Public
const deleteGalleryItem = async (req, res) => {
    try {
        const deletedItem = await Gallery.findOneAndDelete({ id: req.params.id });
        
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting gallery item:', error);
        res.status(500).json({ error: 'Failed to delete gallery item' });
    }
};

module.exports = {
    getGalleryItems,
    createGalleryItem,
    deleteGalleryItem
};
