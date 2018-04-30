const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userService = require('../../services/user');
const config      = require('../');

// Create Google Strategy
const googleOptions = {
  clientID: config.GOOGLE.clientID,
  clientSecret: config.GOOGLE.clientSecret,
  callbackURL: '/auth/google/callback'
};

const googleCallback = (accessToken, refreshToken, profile, done) => {
  console.log('access token', accessToken);
  console.log('refresh token', refreshToken);
  console.log('profile', profile);
};

const googleLogin = new GoogleStrategy(googleOptions, googleCallback);
passport.use(googleLogin);