const User = require('../../models/user');

const userService = {};

userService.findByUsername = (username, email) => {
  if (email) {
    return User.findOne().or([{ username }, { email }]);
  } else {
    return User.findOne().or([{ username }, { email: username }]);
  }
}

userService.findById = id => {
  return User.findById(id);
}

module.exports = userService;