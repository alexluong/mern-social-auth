const express  = require('express');
const passport = require('passport');

const passportService = require('../../services/passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();

/* GET /protected */
router.get('/', requireAuth, (request, response) => {
  response.status(200).send({ hi: 'there '});
});

module.exports = router;