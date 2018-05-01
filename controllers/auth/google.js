const userService = require('../../services/user');

const googleController = {};

googleController.redirect = (request, response, next) => {
  response.redirect(`http://localhost:3000#${userService.generateToken(request.user.id)}`);
  // response.status(200).send({
  //   token: userService.generateToken(request.user.id)
  // });
};

module.exports = googleController;