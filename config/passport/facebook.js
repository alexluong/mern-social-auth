const passport         = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const userService = require('../../services/user');
const config      = require('../');

// Create Facebook Strategy
const facebookOptions = {
  clientID: config.FACEBOOK.clientID,
  clientSecret: config.FACEBOOK.clientSecret,
  callbackURL: '/auth/facebook/redirect'
};

const facebookCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await userService.facebook.findByFacebookId(profile.id);

    if (user) {
      return done(null, user);
    }
    
    const newUser = await userService.facebook.createNewUser(profile.id, accessToken);
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

const facebookLogin = new FacebookStrategy(facebookOptions, facebookCallback);
passport.use(facebookLogin);