const User = require('../../models/user');

const service = {};

service.findByUsername = (username, email) => {
  if (email) {
    return User.findOne().or([{ username }, { email }]);
  } else {
    return User.findOne().or([{ username }, { email: username }]);
  }
}

service.findById = id => {
  return User.findById(id);
}

module.exports = service;