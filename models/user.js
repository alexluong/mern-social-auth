const bcrypt   = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
    index: {
      unique: false,
      partialFilterExpression: {username: {$type: 'string'}}
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    index: {
      unique: true,
      partialFilterExpression: {email: {$type: 'string'}}
    }
  },
  password: String,

  google    : String,
  facebook  : String,
  twitter   : String,
  github    : String,
  instagram : String,
  linkedin  : String,
  steam     : String,
  reddit    : String,
  spotify   : String,
  hackernews: String,
  tokens    : Array,

  profile: {
    name: {
      familyName: String,
      givenName : String
    },
    displayName: String,
    email      : String,
    gender     : String,
    age        : Number,
    birthday   : String,
    location   : String,
    website    : String,
    photo      : String
  }
});

/**
 * Password hash middleware
 */
userSchema.pre('save', function(next) {
  const user = this; // get context

  // Check if 'password' is provided
  if (!user.isModified('password')) {
    next();
  }

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      next(error);
    }

    bcrypt.hash(user.password, salt, null, (error, hash) => {
      console.log(user.password, hash);
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
    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
      if (error) {
        reject(error);
      }
  
      resolve(isMatch);
    }); // bcrypt.compare
  }); // new Promise
}; // userSchema.methos.comparePassword

mongoose.model('Users', userSchema);