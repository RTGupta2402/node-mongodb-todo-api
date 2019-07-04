var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  // To make todo routes private
  _creator: {
    type: mongoose.Schema.Types.ObjectId, //_creator is an ObjectId
    required: true                        // to ensure that user is logged in
  }
});

module.exports = {
  Todo
};
