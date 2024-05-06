const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function () {
  mongoose.connect(config.get('db'))
    .then(() => winston
      .info(`connected to mongoDB with the dataBase name: ${config.get('db')}...`));
  /* .catch((err) => {
      console.error('could not connect to mongoDB..', err);
      console.log(err);
      process.exit(1);
    }); */
};
