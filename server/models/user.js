const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

// Instance-methods - we need to bind 'this' keyword to the individual doc
UserSchema.methods.generateAuthToken = function () {
  // 'this' keyword binds user instance.
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

// model method defined through statics
UserSchema.statics.findByToken = function (token) {
  // 'this' keyword binds User model
  var User = this;
  // stores decoded value by jwt.verify()
  var decoded;

  try{
    decoded = jwt.verify(token, 'secret');
  } catch(e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();
  }

  // finds the associated user (with passed id, token and access)
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

// called before save method.
UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('Users', UserSchema);

module.exports = {
  User
};
