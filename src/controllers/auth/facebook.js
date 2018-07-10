const userService        = require('../../services/user');
const CLIENT_SUCCESS_URI = require('../../config').CLIENT_SUCCESS_URI;

const facebookController = {};

facebookController.redirect = (request, response, next) => {
  response.redirect(`${CLIENT_SUCCESS_URI}#${userService.generateToken(request.user.id)}`);
  // response.status(200).send({
  //   token: userService.generateToken(request.user.id)
  // });
};

module.exports = facebookController;