const passport = require('passport');

const authController  = require('../../controllers/auth');
const passportService = require('../../config/passport');
const googleFirstTime = passport.authenticate('google', {
  session: false,
  scope: ['profile', 'email']
});
const googleCallback = passport.authenticate('google', { session: false });

const router = require('express').Router();

/* GET /auth/google/start */
router.get('/start', googleFirstTime);

/* GET /auth/google/redirect */
router.get('/redirect', googleCallback, authController.google.redirect);

module.exports = router;