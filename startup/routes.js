const exp = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const error = require('../middleware/error');
const user = require('../router/user');
const like = require('../router/like');
const post = require('../router/post');
const auth = require('../router/auth');
const authTok = require('../middleware/auth');
const { toAuth } = require('../middleware/helpers');

module.exports = function (app) {
  app.use(exp.json());
  app.use(helmet());
  app.use(morgan('tiny'));
  app.use(exp.static('public'));
  app.use('/api/user', authTok, user);
  app.use('/api/like', authTok, like);
  app.use('/api/post', authTok, post);
  app.use('/api/auth', toAuth, auth);
  app.use(error);
};
