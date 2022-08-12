const express = require('express');
const Joi = require('joi');

let user = express.Router();
let users = [];
user.get('/',(req,res) => {
  console.log('retrieve users');
  return res.json(users);
});

user.get('/:id', (req, res) => {
let user_id = String(req.params.id);
//console.log(user_id,users);
let user_index = users.findIndex(u => {
  //console.log(u.id, user_id);
  return u.id == user_id
});
if(user_index == -1) return res.status(404).send('The user with the given\
 ID was not found.');
  res.send(users[user_index]);
});
user.post('/',(req,res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  }).unknown();//stripUnknown: true
  const result = schema.validate(req.body);
  if(result.error) return res.status(400).send(result.error.details[0].message);
  const repeated = users.find(u => u.name == req.body.name);
  if(repeated) return res.status(400).send('The user with the given name already exists.');

  users.push({name: req.body.name,id: (+Date.now()).toString(36)});
  res.send(users.at(-1));
});
user.put('/:id',(req,res) => {
let user_id = req.params.id;
let user_index = users.findIndex(u => u.id === user_id);
if(user_index == -1) return res.status(404).send('The user with the given\
 ID was not found.');
 const schema = Joi.object({
  name: Joi.string().min(3).required(),
}).unknown();//stripUnknown: true
const result = schema.validate(req.body);
if(result.error) return res.status(400).send(result.error.details[0].message);

const repeated = users.find(u => u.name == req.body.name);
if(repeated) return res.status(400).send('The user with the given name already exists.');

users[user_index].name = req.body.name;

if(!req.body.name) return res.status(400).send('Name is required.');
res.send(users[user_index]);
return;
});
user.delete('/',(req,res) => {
users = [];
return res.send('users deleted');
});
user.delete('/:id',(req,res) => {
let user_id = req.params.id;
let user_index = users.findIndex(u => u.id === user_id);
if(user_index == -1) return res.status(404).send('The user with the given ID was not found.');
const deleted_user = users.splice(user_index,1);
res.send(deleted_user);

});

module.exports = user;