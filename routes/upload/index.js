const express = require('express');
const passport = require('passport');
const path = require('path');

const uploadController = require('../../controllers/upload');
const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();

/* POST /upload */
router.post('/', requireAuth, uploadController.uploadFile);

module.exports = router;
