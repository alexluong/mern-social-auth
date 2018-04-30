const mongoose = require('mongoose');
const User = mongoose.model('Users');

const googleService = {};

googleService.findById = id => {
  return User.findOne({ google: id });
}

googleService.createNewUser = profile => {
  return new Promise((resolve, reject) => {
    try {
      const { id, emails, displayName, name, gender, photos} = profile;
      const photo = photos[0].value;
      const email = emails[0].value;

      const newUser   = new User();
      newUser.google  = id;
      newUser.profile = { displayName, name, gender, photo, email };

      newUser.save(error => {
        if (error) {
          reject(error);
        }
        resolve(newUser);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = googleService;