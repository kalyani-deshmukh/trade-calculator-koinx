const express = require('express');
const multer = require('multer');
const tradeController = require('../controllers/tradeController');

const router = express.Router();
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'text/csv') {
            return cb(new Error('Only CSV files are allowed'), false);
        }
        cb(null, true);
    }
});

// Route to upload CSV file and process it
router.post('/upload', upload.single('file'), tradeController.uploadAndProcessCSV);

// Route to get asset-wise balance
router.post('/balance', tradeController.getAssetWiseBalance);

module.exports = router;
