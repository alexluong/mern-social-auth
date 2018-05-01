const mongoose = require('mongoose');

const User        = mongoose.model('Users');
const userService = require('../../services/user');

const localController = {};

localController.signup = async (request, response, next) => {
  const { username, email, password } = request.body;
  validate(response, username, email, password);

  try {
    // See if a user with the given username or email exists
    const user = await userService.findByUsername(username, email)
    // If already exists, return an error
    if (user) {
      return response.status(422).send({
        error: 'An account with this username or email address already exists'
      });
    }

    // Else, create and save new user record
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    response.status(200).send({
      token: userService.generateToken(savedUser.id)
    });
  } catch (error) {
    return next(error);
  }
};

localController.signin = (request, response, next) => {
  response.status(200).send({
    token: userService.generateToken(request.user.id)
  });
};

const validate = (response, username, email, password) => {
  if (!email || !username || !password) {
    return response.status(422).send({
      error: 'You must provide username, email, and password'
    });
  }

  if (!validateEmail(email)) {
    return response.status(422).send({
      error: 'You must provide a valid email address'
    });
  }
};

const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

module.exports = localController;