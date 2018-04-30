const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userService = require('../../services/user');
const config      = require('../');

// Create Google Strategy
const googleOptions = {
  clientID: config.GOOGLE.clientID,
  clientSecret: config.GOOGLE.clientSecret,
  callbackURL: '/auth/google/redirect'
};

const googleCallback = (accessToken, refreshToken, profile, done) => {
  userService.google.findByGoogleId(profile.id)
  .then(user => {
    if (user) {
      done(null, user);
    }
    
    userService.google.createNewUser(profile)
    .then(newUser => {
      done(null, newUser);
    }) // then
    .catch(error => {
      done(error);
    }); // userService.createBySocial
  }) // then
  .catch(error => {
    done(error);
  }); // userService.findBySocialID
}; // googleCallback

const googleLogin = new GoogleStrategy(googleOptions, googleCallback);
passport.use(googleLogin);