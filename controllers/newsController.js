const News = require('../models/News');

// @desc    Get all news items
// @route   GET /api/news
// @access  Public
const getNewsItems = async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        const mappedNews = news.map(item => ({
            id: item.id,
            image: item.image,
            title: item.title,
            summary: item.summary,
            date: item.date,
            createdAt: item.createdAt
        }));
        
        res.status(200).json(mappedNews);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news items' });
    }
};

// @desc    Create a news item
// @route   POST /api/news
// @access  Public
const createNewsItem = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'Image file is required' });

        const newItem = new News({
            image: `http://localhost:5000/uploads/${req.file.filename}`,
            title: req.body.title,
            summary: req.body.summary,
            date: req.body.date || new Date().toLocaleDateString(),
        });

        const savedItem = await newItem.save();
        
        res.status(201).json({
            id: savedItem.id,
            image: savedItem.image,
            title: savedItem.title,
            summary: savedItem.summary,
            date: savedItem.date,
            createdAt: savedItem.createdAt
        });
    } catch (error) {
        console.error('Error creating news item:', error);
        res.status(500).json({ error: 'Failed to create news item' });
    }
};

// @desc    Delete a news item
// @route   DELETE /api/news/:id
// @access  Public
const deleteNewsItem = async (req, res) => {
    try {
        const deletedItem = await News.findOneAndDelete({ id: req.params.id });
        
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting news item:', error);
        res.status(500).json({ error: 'Failed to delete news item' });
    }
};

module.exports = {
    getNewsItems,
    createNewsItem,
    deleteNewsItem
};
