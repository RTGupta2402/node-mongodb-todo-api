const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany - deletes multiple docs
  // db.collection('Todos').deleteMany({
  //   text: 'Book an appointment with doctor'
  // })
  // .then((result) => {
  //   console.log(result);
  // });
  db.collection('Users').deleteMany({name: 'Aarti'}).then((result) => {
    console.log(result);
  });

  // deleteOne - deletes only one doc (the first one) that matches the criteria
  // db.collection('Todos').deleteOne({
  //   text: 'Book an appointment with doctor'
  // })
  // .then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete (targets just the first one it finds)
  // db.collection('Todos').findOneAndDelete({
  //   completed: false
  // })
  // .then((result) => {
  //   console.log(result);
  // });
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5d0b18105130dd228513d321')
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });

  // db.close();
});
