const jwt = require('jsonwebtoken');
const config = require('config');

module.exports.isAdmin = function (req, res, next) {
  if (req.user.isAdmin === true) {
    next();
  } else {
    res.status(401).send('Admin access only.');
  }
};

module.exports.sameId = function (req, res, next) {
  if (req.params.id === req.user._id) {
    next();
  } else {
    res.status(401).send('you can see only your profile.');
  }
};

module.exports.toAuth = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (token) {
    jwt.verify(token, config.get('jwtPrivateKey'), (err) => {
      if (err) return next();
      return res.send('you already logged in');
    });
  } else {
    return next();
  }
};

module.exports.adminOrId = function (req, res, next) {
  if (!req.user.isAdmin && String(req.params.id) !== String(req.user._id)) {
    return res.status(401).send('you can only see/update your profile.');
  }

  next();
};
