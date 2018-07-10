const userService = require('../../services/user');

const userController = {};

userController.getCurrentUser = (request, response) => {
  response.status(200).send({ user: request.user });
};

userController.updateAvatar = async (request, response) => {
  try {
    const user = await userService.findById(request.user.id);
    user.profile.photoURL = request.body.url;
    user.save();
    response.sendStatus(200);
  } catch (error) {
    response.status(503).send({ error, message: 'Update avatar failed.' });
  }
};

module.exports = userController;
