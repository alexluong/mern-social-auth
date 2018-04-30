const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userService = require('../../services/user');
const config      = require('../');
const mongoose = require('mongoose');
const User = mongoose.model('Users');

// Create Google Strategy
const googleOptions = {
  clientID: config.GOOGLE.clientID,
  clientSecret: config.GOOGLE.clientSecret,
  callbackURL: '/auth/google/callback'
};

const googleCallback = (accessToken, refreshToken, profile, done) => {
  const { id, emails, displayName, name, gender, photos} = profile;
  const photo = photos[0].value;
  const email = emails[0].value;
  
  const newUser   = new User();
  newUser.google  = id;
  newUser.profile = { displayName, name, gender, photo, email };
  done(false, newUser);
};

const googleLogin = new GoogleStrategy(googleOptions, googleCallback);
passport.use(googleLogin);