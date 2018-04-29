const passport = require('passport');

const localRoute     = require('./auth/local');
const protectedRoute = require('./protected');


const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/ping', (request, response) => {
    response.status(200).send({ });
  });
  app.use('/protected', protectedRoute);
  app.use('/local', localRoute);
}