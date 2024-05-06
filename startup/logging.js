const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
  /* process.on('uncaughtException', (ex) => {
    console.log('We got an uncaughtException');
    winston.error(ex.message, ex);
    process.exit(1);
  });

  process.on('unhandledRejection', (ex) => {
    console.log('We got an unhandledRejection');
    winston.error(ex.message, ex);
    process.exit(1);
    // alternative: throw ex;
  });
  // alternative : i think it ends the process too;
  */
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
  );
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  // winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/mongoDemo' });
};
