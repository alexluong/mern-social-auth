const passport = require('passport');

const Authentication  = require('./controllers/authentication');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (request, response) => {
    response.send({ hi: 'there '});
  });
  app.post('/signup', Authentication.signup);
}