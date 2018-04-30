const localController  = require('./local');
const googleController = require('./google');

const authController = {};

authController.local  = localController;
authController.google = googleController;

module.exports = authController;