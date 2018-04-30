const jwt      = require('jwt-simple');
const mongoose = require('mongoose');
const User = mongoose.model('Users');

const googleService = require('./google');
const userService = {};

userService.findByUsername = (username, email) => {
  if (email) {
    return User.findOne().or([{ username }, { email }]);
  } else {
    return User.findOne().or([{ username }, { email: username }]);
  }
};

userService.findById = id => {
  return User.findById(id);
};

userService.generateToken = id => {
  const SECRET = require('../../config').SECRET;
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: id, iat: timestamp }, SECRET);
};

userService.google = googleService;

module.exports = userService;