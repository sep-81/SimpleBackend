// const config = require('config');
const mongoose = require('mongoose')
const debugStart = require('debug')('app:startup')
const debugDB = require('debug')('app:db')

const exp = require('express')
const Joi = require('joi')
const helemt = require('helmet')
const morgan = require('morgan')
const user = require('./router/user')
const like = require('./router/like')
const post = require('./router/post')

const app = exp()
mongoose.connect('mongodb://localhost/mongoDemo')

/* app.set('view engine', 'pug');
app.set('views', './views'); */

app.use(exp.json())
app.use('/api/user', user)
app.use('/api/like', like)
app.use('/api/post', post)
app.use(helemt())
app.use(morgan('tiny'))
// app.use(exp.static('public'));
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

app.listen(3000, () => { console.log('hello listenong on port 3000') })
console.log(process.env.NODE_PATH, '\n\n')
