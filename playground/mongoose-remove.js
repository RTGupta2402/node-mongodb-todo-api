const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
//
// Todo.deleteMany({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

Todo.findByIdAndDelete('5d12056c5130dd2285164a93').then((todo) => {
  console.log(todo);
});

Todo.findOneAndDelete('5d12056c5130dd2285164a93').then((todo) => {
  console.log(todo);
});
