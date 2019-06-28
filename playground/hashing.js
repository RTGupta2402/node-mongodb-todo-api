const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$KAFXe9xoeJdO37B7MJnAaObxm.oDDP2ego4fFxjJ5ut6nxLiskcI6';
// compare
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, 'somesecret');
// console.log('Token: ', token);
//
// var decoded = jwt.verify(token, 'somesecret');
// console.log('decoded: ', decoded);

// var message = 'I am user number 1';
// var hash = SHA256(message).toString();
//
// console.log( `Message: ${message}`);
// console.log(`Hash: ${hash}`);

// data with userId=4
// var data = {
//   // id represents the user for which we need to access data
//   id: 4
// };
//
// // token makes sure that the data is not changed.
// var token = {
//     data,
//     // hash value of data + salting (something added to hashed string to make the encrypted string unique)
//     // Now even if someone tries to change the data and rehash, it would not be equal to resulted string during verification.
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// // token.data = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// // stroes the hash of the data that comes back.
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Dont trust!');
// }
