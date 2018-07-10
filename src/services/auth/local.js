const localService = {};

localService.validate = (username, email, password) => {
  if (!email || !username || !password) {
    return {
      success: false,
      error: 'You must provide username, email, and password'
    };
  }

  if (!isEmail(email)) {
    return {
      success: false,
      error: 'You must provide a valid email address'
    };
  }

  return { success: true };
};

const isEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

module.exports = localService;