const mongoose = require('mongoose');

const User        = mongoose.model('Users');
const userService = require('../../services/user');
const validate    = require('../../services/auth/local').validate;
const catchErrors = require('../../services/errorHandlers').catchErrors;

const signup = async (request, response, next) => {
  const { username, email, password } = request.body;
  validate(response, username, email, password);

  const user = await userService.findByUsername(username, email)
  
  if (user) {
    return response.status(422).send({
      error: 'An account with this username or email address already exists'
    });
  }

  const newUser = new User({ username, email, password });
  const savedUser = await newUser.save();

  response.status(200).send({
    token: userService.generateToken(savedUser.id)
  });
};

const signin = (request, response, next) => {
  // If we got here, passport already authorized the user
  response.status(200).send({
    token: userService.generateToken(request.user.id)
  });
};

const localController =  {
  signup: catchErrors(signup),
  signin
};

module.exports = localController;