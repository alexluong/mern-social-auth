const jwt = require('jwt-simple');

const User   = require('../models/user');
const config = require('../config');

exports.signup = (request, response, next) => {
  const { username, email, password } = request.body;
  validate(response, username, email, password);

  // See if a user with the given username or email exists
  User.findOne().or([{ username }, { email }])
  .then(existingUser => {
    // If already exists, return an error
    if (existingUser) {
      return response.status(422).send({
        error: 'An account with this username or email address already exists'
      });
    }

    // Else, create and save new user record
    const newUser = new User({ username, email, password });
    newUser.save().then(user => {
      response.status(200).send({
        token: tokenForUser(user)
      });
    }).catch(error => {
      next(error);
    }); // newUser.save()
  }).catch(error => {
    return next(error);
  }); // User.findOne()
}

exports.signin = (request, response, next) => {
  response.status(200).send({
    token: tokenForUser(request.user)
  });
}

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
}

const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.SECRET);
}