const bcrypt   = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

// On Save Hook, encrypt password
userSchema.pre('save', async function(next) {
  const user = this; // get context

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }

    bcrypt.hash(user.password, salt, null, (error, hash) => {
      user.password = hash;
      next();
    }); // bcrypt.hash
  }); // bcrypt.genSalt
}); // userSchema.pre

const ModelClass = mongoose.model('user', userSchema);
module.exports = ModelClass;
