var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  // import a file storing the configuration information
  var config = require('./config.json');
  // console.log(config);
  var envConfig = config[env];

  // console.log(Object.keys(envConfig));
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}

// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/Todo-App';
// } else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/Todo-App-Test';
// }
