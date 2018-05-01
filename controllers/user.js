const userController = {};

userController.getCurrentUser = (request, response) => {
  response.status(200).send({ user: request.user });
};

module.exports = userController;