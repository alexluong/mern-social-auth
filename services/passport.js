const passport    = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;

const User   = require('../models/user');
const config = require('../config');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub).then(user => {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }).catch(error => {
    return done(error, false);
  });
});

passport.use(jwtLogin);