const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5d11ddbc4779bc2c0a164f7111';
// var id = '6d11ddbc4779bc2c0a164f71';

// if(!ObjectID.isValid(id)) {
//   console.log('ObjectID not valid');
// }
//
// // Todo.find({
// //   _id: id
// // }).then((todos) => {
// //   console.log('Todos: ', todos);
// // });
// //
// // Todo.findOne({
// //   _id: id
// // }).then((todo) => {
// //   console.log('Todo fetched: ', todo);
// // });
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found!');
//   }
//   console.log('TodoById fetched: ', todo);
// }).catch((e) => console.log(e));

var user_id = '5d10a64de6c84166f1b68f0c';

User.findById(user_id).then((user) => {
  if (!user) {
    return console.log('User not found!');
  }
  console.log('User fetched by ID: ', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
