var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  // req.header fetched the token
  var token = req.header('x-auth');

  // model method accessed via model User
  User.findByToken(token).then((user) => {
    if (!user) {
      // res.status(401).send();
      return Promise.reject();
    }

    //res.send(user);
    //modify the req instead
    req.user = user;
    req.token = token;
    //next allows the next route to execute
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
