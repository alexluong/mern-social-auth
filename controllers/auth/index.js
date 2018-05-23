const localController    = require('./local');
const googleController   = require('./google');
const facebookController = require('./facebook');

const authController = {};

authController.local    = localController;
authController.google   = googleController;
authController.facebook = facebookController;

module.exports = authController;