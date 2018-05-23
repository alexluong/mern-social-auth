const passport = require('passport');

const authController  = require('../../controllers/auth');
const passportService = require('../../config/passport');
const facebookFirstTime = passport.authenticate('facebook', {
  session: false,
  scope: ['public_profile', 'email', 'user_gender']
});
const facebookCallback = passport.authenticate('facebook', { session: false });

const router = require('express').Router();

/* GET /auth/facebook/start */
router.get('/start', facebookFirstTime);

/* GET /auth/facebook/redirect */
router.get('/redirect', facebookCallback, authController.facebook.redirect);

module.exports = router;