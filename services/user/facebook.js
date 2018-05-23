const axios    = require('axios');
const mongoose = require('mongoose');
const User = mongoose.model('Users');

const facebookService = {};

facebookService.findByFacebookId = id => {
  return User.findOne({ facebook: id });
}

facebookService.createNewUser = (id, accessToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fields   = 'id,name,first_name,last_name,gender,email,picture';
      const response = await axios.get(`https://graph.facebook.com/${id}?access_token=${accessToken}&fields=${fields}`);
      const user = response.data;
      const { name, first_name, last_name, gender, email, picture } = user;

      const newUser = new User();
      newUser.facebook = id;
      newUser.profile  = {
        displayName: name,
        name: {
          firstName: first_name,
          lastName: last_name
        },
        gender,
        email,
        photoURL: picture.data.url
      };

      const savedUser = await newUser.save();
      resolve(savedUser);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = facebookService;