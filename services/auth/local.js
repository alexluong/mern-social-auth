const localService = {};

localService.validate = (response, username, email, password) => {
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

module.exports = localService;