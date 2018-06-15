const passport = require('passport');
require('../config/passport');

const requireAuthentication = passport.authenticate('jwt', { session: false });

module.exports = requireAuthentication;
