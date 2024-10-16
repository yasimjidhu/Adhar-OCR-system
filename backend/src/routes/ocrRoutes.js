const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const ocrController = require('../controller/ocrController');

// Route to handle OCR processing
router.post('/', upload.array('aadhaarImages', 2), ocrController.performOCR);

module.exports = router;
