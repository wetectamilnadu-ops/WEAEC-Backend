// const express = require('express');
// const router = express.Router();
// const { submitInquiry } = require('../controllers/inquiryController');

// router.post('/', submitInquiry);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { submitInquiry, getInquiries } = require('../controllers/inquiryController');

// POST route
router.post('/', submitInquiry);

// GET route
router.get('/', getInquiries);

module.exports = router;