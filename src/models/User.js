const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
    index: {
      unique: false,
      partialFilterExpression: { username: { $type: 'string' } },
    },
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    index: {
      unique: true,
      partialFilterExpression: { email: { $type: 'string' } },
    },
  },
  password: {
    type: String,
    select: false,
  },

  google: String,
  facebook: String,
  twitter: String,
  github: String,
  instagram: String,
  linkedin: String,
  steam: String,
  reddit: String,
  spotify: String,
  hackernews: String,
  tokens: Array,

  profile: {
    name: {
      firstName: String,
      lastName: String,
    },
    displayName: String,
    email: String,
    gender: String,
    age: Number,
    birthday: String,
    location: String,
    website: String,
    photoURL: String,
  },
});

/**
 * Password hash middleware
 */
userSchema.pre('save', function(next) {
  const user = this; // get context

  // Check if 'password' is provided
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }

    /**
     * user.password is readable
     * because we haven't saved User to database
     * so password field is not protected yet
     */
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      user.password = hash;
      next();
    }); // bcrypt.hash
  }); // bcrypt.genSalt
}); // userSchema.pre

/**
 * Helper method for validating user's password
 */
userSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    User.findOne({ username: this.username })
      .select('password')
      .exec(function(err, user) {
        bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
          if (error) {
            reject(error);
          }

          resolve(isMatch);
        }); // bcrypt.compare
      }); // User.findOne
  }); // new Promise
}; // userSchema.methods.comparePassword

const User = mongoose.model('Users', userSchema);
