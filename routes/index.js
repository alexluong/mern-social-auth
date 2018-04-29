const localRoute     = require('./auth/local');
const protectedRoute = require('./protected');

const router = app => {
  app.get('/ping', (request, response) => {
    response.status(200).send({ });
  });
  app.use('/protected', protectedRoute);
  app.use('/auth', localRoute);
};

module.exports = router;