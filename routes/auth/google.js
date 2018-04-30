const passport = require('passport');

const localController = require('../../controllers/authentication/local');
const passportService = require('../../config/passport');
const googleFirstTime = passport.authenticate('google', {
  scope: ['profile', 'email']
});
const googleCallback = passport.authenticate('google');

const router = require('express').Router();

/* GET /auth/google */
router.get('/', googleFirstTime);

/* GET /auth/google/callback */
router.get('/callback', googleCallback);

module.exports = router;