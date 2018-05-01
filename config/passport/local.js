const passport       = require('passport');
const LocalStrategy  = require('passport-local').Strategy;

const userService = require('../../services/user');

// Create Local Strategy
const localOptions = {}

const localCallback = async (username, password, done) => {
  try {
    const user = await userService.findByUsername(username)
    
    if (!user) {
      return done(null, false);
    }
    
    const isMatch = user.comparePassword(password)

    if (!isMatch) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

const localLogin = new LocalStrategy(localOptions, localCallback);

passport.use(localLogin);