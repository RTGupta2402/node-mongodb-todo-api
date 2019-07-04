require('./config/config.js');

const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  //console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
    //console.log('Unable to save todo', err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/parameters (:param)
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  // res.send(req.params);

  //validating the ID
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  //find the todo associated with id
  Todo.findById(id).then((todo) => {
    //when id is not found
    if(!todo) {
      return res.status(404).send();
    }
    //send the fetched todo
    res.send({todo});
    console.log(JSON.stringify(todo, undefined, 2));
  }, (e) => {
    res.status(404).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)){
    console.log('Invalid ID');
    return res.status(404).send();
  }

  Todo.findByIdAndDelete(id).then((todo) => {
    if(!todo) {
      console.log('Todo not found!');
      return res.status(404).send();
    }

    res.send({todo});
    console.log(JSON.stringify(todo, undefined, 2));
  }, (e) => {
    console.log('Error occured!', e);
    res.status(404).send();
  });
});

// HTTP Patch Route - used when we want to update the resource
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => res.status(400).send());
});

// POST /users sign-up call
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    //generate the token for this user (instance)
    return user.generateAuthToken();
    // res.send(user);
  }).then((token) => {
    // this promise is used to send back the user associated with the token generated.
    // token is sent back as HTTP header (K,V) - x-auth custom header and value=token
    res.header('x-auth', token).send(user);
  }).catch ((err) => {
    res.status(400).send(err);
  });
});

// app.get('/users', (req, res) => {
//   User.find().then((users) => {
//     res.send({users});
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });

// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
  // // req.header fetched the token
  // var token = req.header('x-auth');
  //
  // // model method accessed via model User
  // User.findByToken(token).then((user) => {
  //   if (!user) {
  //     // res.status(401).send();
  //     return Promise.reject();
  //   }
  //
  //   res.send(user);
  // }).catch((e) => {
  //   res.status(401).send();
  // });
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  
  // res.send(body);
  // verify the user exists with credentials passed in request
  User.findByCredentials(body.email, body.password).then((user) => {
    // res.send(user);
    user.generateAuthToken().then((token) => {
      return res.header('x-auth', token).send(user);
    })
  }).catch((e) => {
    res.status(400).send();
  });
});

// DELETE user 
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}.`);
});

module.exports = {
  app
};
