const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const userService = require('../../services/user');
const config = require('../');

// Create JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SECRET,
  session: false,
};

const jwtCallback = async (payload, done) => {
  try {
    const user = await userService.findById(payload.sub);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

const jwtLogin = new JwtStrategy(jwtOptions, jwtCallback);
passport.use(jwtLogin);
