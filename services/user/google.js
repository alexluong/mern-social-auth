const mongoose = require('mongoose');
const User = mongoose.model('Users');

const googleService = {};

googleService.findByGoogleId = id => {
  return User.findOne({ google: id });
}

googleService.createNewUser = profile => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, emails, displayName, name, gender, photos} = profile;
      const photoURL = photos[0].value;
      const email    = emails[0].value;

      const newUser   = new User();
      newUser.google  = id;
      newUser.profile = {
        displayName,
        name: {
          firstName: name.givenName,
          lastName : name.familyName
        },
        gender,
        photoURL,
        email
      };

      const savedUser = await newUser.save();
      resolve(savedUser);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = googleService;