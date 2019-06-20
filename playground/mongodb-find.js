const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  //   console.log('Todos:');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   return console.log('Unable to fetch Todos', err);
  // });

  // db.collection('Todos').find({
  //   _id: new ObjectID('5d0af81c5130dd228513c644')
  // }).toArray().then((docs) => {
  //   console.log('Todos:');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   return console.log('Unable to fetch Todos', err);
  // });

  db.collection('Todos').find().count().then((count) => {
    console.log('Todos:');
    console.log(`Todos count: ${count}`);
  }, (err) => {
    return console.log('Unable to fetch Todos', err);
  });

  db.collection('Users').find({
    name: 'Aarti'
  }).toArray().then((docs) => {
    console.log('Users:');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    return console.log('Unable to fetch Todos', err);
  });

  // db.close();
});
