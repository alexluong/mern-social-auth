const express = require('express');
const passport = require('passport');

const userController = require('../controllers/user');
const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();

/* GET /user/current */
router.get('/current', requireAuth, userController.getCurrentUser);

/* PUT /user/avatar */
router.put('/avatar', requireAuth, userController.updateAvatar);

module.exports = router;
