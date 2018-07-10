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

const googleCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await userService.google.findByGoogleId(profile.id);
    
    if (user) {
      return done(null, user);
    }
      
    const newUser = await userService.google.createNewUser(profile);
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

const googleLogin = new GoogleStrategy(googleOptions, googleCallback);
passport.use(googleLogin);