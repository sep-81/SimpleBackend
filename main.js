require('express-async-errors'); // no need to use try catch block
// const winston = require('winston');
// require('winston-mongodb');
// const mongoose = require('mongoose');
// const debugStart = require('debug')('app:startup');
// const debugDB = require('debug')('app:db');
// const Joi = require('joi');
const exp = require('express');

const app = exp();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);
/* app.set('view engine', 'pug');
app.set('views', './views'); */

// console.log(process.env,"\n\n");
// console.log(process.env.PORT,"\n\n");
// console.log(process.env.var,"\n\n");

// Congiguration
/* debugStart(config.get('name'));
console.log(config.get('mail.host'));
console.log(config.get('mail.password')); */

/* app.get('/', (req,res) => {
  console.log("hello iran")
  res.render('menu', {title: 'Home', massage: 'Welcome to the Home Page'});
});
*/

const server = app.listen(3000, () => { console.log('hello listening on port 3000'); });
console.log(process.env.NODE_PATH, '\n\n');

module.exports = server;
