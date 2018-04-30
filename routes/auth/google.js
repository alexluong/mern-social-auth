const passport = require('passport');

const localController = require('../../controllers/authentication/local');
const passportService = require('../../config/passport');
const googleFirstTime = passport.authenticate('google', {
  session: false,
  scope: ['profile', 'email']
});
const googleCallback = passport.authenticate('google', { session: false });

const router = require('express').Router();

/* GET /auth/google/start */
router.get('/start', googleFirstTime);

/* GET /auth/google/callback */
router.get('/redirect', googleCallback, (request, response, next) => {
  response.send({ hello: 'there' });
});

module.exports = router;