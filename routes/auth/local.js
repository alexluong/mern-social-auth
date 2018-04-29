const express  = require('express');
const passport = require('passport');

const localController = require('../../controllers/authentication/local');
const passportService = require('../../services/passport');
const requireSignin = passport.authenticate('local', { session: false });

const router = express.Router();

/* POST /local/signin */
router.post('/signin', requireSignin, localController.signin);

/* POST /local/signup */
router.post('/signup', localController.signup);

module.exports = router;