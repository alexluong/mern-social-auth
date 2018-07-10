const express = require('express');
const requireAuthentication = require('../../middlewares/requireAuthentication');
const uploadController = require('../../controllers/upload');

const router = express.Router();

/* GET /upload */
router.get('/', requireAuthentication, uploadController.uploadFile);

module.exports = router;
