const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { getGalleryItems, createGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');

router.route('/')
    .get(getGalleryItems)
    .post(upload.single('image'), createGalleryItem);

router.route('/:id')
    .delete(deleteGalleryItem);

module.exports = router;
