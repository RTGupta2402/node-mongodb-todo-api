const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message:`{VALUE} is not a valid email`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// used to limit the data coming back as response after converting mongoose.model into JSON.
UserSchema.methods.toJSON = function () {
  var user = this;
  // converts the model into an object
  var userObject = user.toObject();

  // return only the properties that needs to be sent in response.
  return _.pick(userObject, ['_id', 'email']);
};

// we need to bind 'this' keyword to the individual doc
UserSchema.methods.generateAuthToken = function () {
  // 'this' keyword binds user variable.
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'secret').toString();

  // update tokens array
  user.tokens.push({access, token});

  // save the changes to user
  return user.save().then(() => {
    // return the token to be able to grab the token later.
    return token;
  });
};

var User = mongoose.model('Users', UserSchema);

module.exports = {
  User
};
