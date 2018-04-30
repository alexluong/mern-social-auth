const passport = require('passport');

const localController = require('../../controllers/authentication/local');
const passportService = require('../../config/passport');
const requireSignin = passport.authenticate('local', { session: false });

const router = require('express').Router();

/* POST /auth/local/signin */
router.post('/signin', requireSignin, localController.signin);

/* POST /auth/local/signup */
router.post('/signup', localController.signup);

module.exports = router;