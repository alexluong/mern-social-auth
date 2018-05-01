const express  = require('express');
const passport = require('passport');

const userController  = require('../controllers/user');
const passportService = require('../config/passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();

/* GET /user/current */
router.get('/current', requireAuth, userController.getCurrentUser);

module.exports = router;