const passport       = require('passport');
const LocalStrategy  = require('passport-local').Strategy;

const userService = require('../../services/user');

// Create Local Strategy
const localOptions = {}

const localCallback = (username, password, done) => {
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
}; // localCallback

const localLogin = new LocalStrategy(localOptions, localCallback);

passport.use(localLogin);