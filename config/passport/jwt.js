const passport    = require('passport');
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const userService = require('../../services/user');
const config      = require('../');

// Create JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.SECRET,
  session: false
};

const jwtCallback = (payload, done) => {
  userService.findById(payload.sub).then(user => {
    if (!user) {
      done(null, false);
    }

    done(null, user);
  }).catch(error => {
    return done(error, false);
  });
};

const jwtLogin = new JwtStrategy(jwtOptions, jwtCallback);
passport.use(jwtLogin);