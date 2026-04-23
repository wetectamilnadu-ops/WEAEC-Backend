const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { getNewsItems, createNewsItem, deleteNewsItem } = require('../controllers/newsController');

router.route('/')
    .get(getNewsItems)
    .post(upload.single('image'), createNewsItem);

router.route('/:id')
    .delete(deleteNewsItem);

module.exports = router;
