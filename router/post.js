const express = require('express');
const Joi = require('joi');

let post = express.Router();
let posts = [];
post.get('/',(req,res) => {
  console.log('retrieve users');
  return res.json(posts);
});

post.get('/:id', (req, res) => {
let post_id = String(req.params.id);
//console.log(user_id,users);
let post_index = posts.findIndex(p => {
  //console.log(u.id, user_id);
  return p.id == post_id
});
if(post_index == -1) return res.status(404).send('The post with the given\
 ID was not found.');
  res.send(posts[post_index]);
});
post.post('/',(req,res) => {
  const schema = Joi.object({
    title: Joi.string().alphanum().min(3).required(),
    body: Joi.string().alphanum().min(3).required(),
    user_id: Joi.string().alphanum().min(3).required(),
  }).unknown();//stripUnknown: true
  const result = schema.validate(req.body);
  if(result.error) return res.status(400).send(result.error.details[0].message);
  posts.push({titel: req.body.title,user_id: req.body.user_id, id: (+Date.now()).toString(36),body: req.body.body});
  res.send(posts.at(-1));
});
post.put('/:id',(req,res) => {
let post_id = req.params.id;
let post_index = posts.findIndex(p => p.id === post_id);
if(post_index == -1) return res.status(404).send('The post with the given\
 ID was not found.');
 const schema = Joi.object({
  title: Joi.string().alphanum().min(3),
  body: Joi.string().alphanum().min(3),
  user_id: Joi.string().alphanum().min(3),
}).unknown();
const result = schema.validate(req.body);
if(result.error) return res.status(400).send(result.error.details[0].message);
let cur_post = posts[post_index];
({title: cur_post.title=cur_post.title, body: cur_post.body=cur_post.body,
  user_id: cur_post.user_id=cur_post.user_id } = req.body);
res.send(posts[post_index]);
return;
});
post.delete('/',(req,res) => {
posts = [];
return res.send('all posts deleted');
});
post.delete('/:id',(req,res) => {
let post_id = req.params.id;
let post_index = posts.findIndex(p => p.id === post_id);
if(post_index == -1) return res.status(404).send('The post with the given ID was not found.');
const deleted_post = posts.splice(post_index,1);
res.send(deleted_post);

});

module.exports = post;