const exp = require('express');
const Joi = require('joi');
const app = exp();
app.use(exp.json());
//console.log(process.env,"\n\n");
//console.log(process.env.PORT,"\n\n");
//console.log(process.env.var,"\n\n");
let users = [];
let posts = [];
let likes = [];

app.get('/users',(req,res) => {
    console.log('foo');
    return;
});

app.get('/users/:id', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  }
    const name = req.body.name;
    if(!name) res.send('there is no name!');
    res.send();
});
app.post('/users',(req,res) => {
    const schema = {
        name: Joi.string().min(3).required(),
    }
    const name = req.body.name;
    if(!name) return res.send('there is no name!');
    users.push({name,id:+Date.now()});
    res.send(users.at(-1));
});
app.put('/users/:id',(req,res) => {
  let user_id = req.params.id;
  let user_index = users.findIndex(u => u.id === user_id);
  if(user_index == -1) return res.status(404).send('The user with the given ID was not found.');
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