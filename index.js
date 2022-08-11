const exp = require('express');
const Joi = require('joi');
const { init } = require('./app');
const app = exp();
app.use(exp.json());
//console.log(process.env,"\n\n");
//console.log(process.env.PORT,"\n\n");
//console.log(process.env.var,"\n\n");
let users = [];
let posts = [];
let likes = [];

app.get('/users',(req,res) => {
    console.log('retrieve users');
    return res.json(users);
});

app.get('/users/:id', (req, res) => {
  let user_id = String(req.params.id);
  console.log(user_id,users);
  let user_index = users.findIndex(u => {
    console.log(u.id, user_id);
    return u.id == user_id
  });
  if(user_index == -1) return res.status(404).send('The user with the given\
   ID was not found.');
    res.send(users[user_index]);
});
app.post('/users',(req,res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    }).unknown();
    const result = schema.validate(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);
    users.push({name: req.body.name,id: (+Date.now()).toString(36)});
    res.send(users.at(-1));
});
app.put('/users/:id',(req,res) => {
  let user_id = req.params.id;
  let user_index = users.findIndex(u => u.id === user_id);
  if(user_index == -1) return res.status(404).send('The user with the given\
   ID was not found.');
  users[user_index].name = req.body.name;
  if(!req.body.name) return res.status(400).send('Name is required.');
  res.send(users[user_index]);
  return;
});
app.delete('/users',(req,res) => {
  users = [];
  return res.send('users deleted');
});
app.delete('/users/:id',(req,res) => {
  let user_id = req.params.id;
  let user_index = users.findIndex(u => u.id === user_id);
  if(user_index == -1) return res.status(404).send('The user with the given ID was not found.');
  const deleted_user = users.splice(user_index,1);
  res.send(deleted_user);

});
app.listen(3000,() => { console.log("hello listenong on port 3000"); });
console.log(process.env.NODE_PATH,"\n\n");