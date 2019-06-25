var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Todo-App');

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
  }
});
// insert one doc
// var newTodo = new Todo({
//   text: 'Book an appointment with doctor',
// });

// var secondTodo = new Todo({
//   text: 'Buy groceries',
//   completed: true,
//   completedAt: 123
// });

// var otherTodo = new Todo({
//   text: '  Feed the dog  '
// });
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (err) => {
//   console.log('Unable to save Todo');
// });
//
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//   console.log('Unable to save second Todo', err);
// });

var User = mongoose.model('Users', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

//
// var user1 = new User({
//   email: 'aarti.gupta@soprasteria.com'
// });
//
// user1.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//   console.log('Unable to save the user', err);
// })
