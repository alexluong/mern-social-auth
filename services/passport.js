const passport      = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;

const userService = require('./user');
const config      = require('../config');

// Create Local Strategy
const localOptions = {}

const onLocalStrategy = (username, password, done) => {
  userService.findByUsername(username)
  .then(user => {
    if (!user) {
      done(null, false);
    }
    
    user.comparePassword(password).then(isMatch => {
      if (!isMatch) {
        done(null, false);
      }
      done(null, user);
    }).catch(error => {
      done(error);
    }); // user.comparePassword
  }).catch(error => {
     done(error);
  }); // userService.findByUsername
};

const localLogin = new LocalStrategy(localOptions, onLocalStrategy);

// Create JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.SECRET,
  session: false
};

const onJwtStrategy = (payload, done) => {
  userService.findById(payload.sub).then(user => {
    if (!user) {
      done(null, false);
    }

    done(null, user);
  }).catch(error => {
    return done(error, false);
  });
};

const jwtLogin = new JwtStrategy(jwtOptions, onJwtStrategy);

passport.use(jwtLogin);
passport.use(localLogin);