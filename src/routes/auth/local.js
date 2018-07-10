const passport = require('passport');

const authController  = require('../../controllers/auth');
const passportService = require('../../config/passport');
const requireSignin = passport.authenticate('local', { session: false });

const router = require('express').Router();

/* POST /auth/local/signin */
router.post('/signin', requireSignin, authController.local.signin);

/* POST /auth/local/signup */
router.post('/signup', authController.local.signup);

/**
 * TODO: Implement a check username route with websocket
 * to check availability as user's typing in realtime
 */

module.exports = router;