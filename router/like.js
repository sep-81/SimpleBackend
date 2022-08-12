const express = require('express');
const Joi = require('joi');

let like = express.Router();
let likes = [];
like.get('/',(req,res) => {
  console.log('retrieve users');
  return res.json(likes);
});

like.get('/:id', (req, res) => {
let like_id = String(req.params.id);
//console.log(user_id,users);
let like_index = likes.findIndex(l => {
  //console.log(u.id, user_id);
  return l.id == like_id

});
if(like_index == -1) return res.status(404).send('The like with the given\
 ID was not found.');
  res.send(likes[like_index]);
});
like.post('/',(req,res) => {
  const schema = Joi.object({
    post_id: Joi.string().alphanum().min(3).required(),
    user_id: Joi.string().alphanum().min(3).required(),
  }).options({stripUnkonw: true}); //stripUnknown: true
  const result = schema.validate(req.body);
  if(result.error) return res.status(400).send(result.error.details[0].message);
  let likeObj = result.value;
  likeObj.id = (+Date.now()).toString(36);
  likes.push(likeObj);
  res.send(likes.at(-1));
});
like.put('/:id',(req,res) => {
let like_id = req.params.id;
let like_index = likes.findIndex(l => l.id === like_id);
if(like_index == -1) return res.status(404).send('The like with the given\
 ID was not found.');
 const schema = Joi.object({
  post_id: Joi.string().alphanum().min(3),
  user_id: Joi.string().alphanum().min(3),
}).options({stripUnkonw: true});
const result = schema.validate(req.body);
if(result.error) return res.status(400).send(result.error.details[0].message);
let cur_like = likes[like_index];
({post_id: cur_like.post_id=cur_like.post_id, user_id: cur_like.user_id=cur_like.user_id
} = req.body);
res.send(likes[like_index]);
return;
});
like.delete('/',(req,res) => {
likes = [];
return res.send('all likes deleted');
});
like.delete('/:id',(req,res) => {
let like_id = req.params.id;
let like_index = likes.findIndex(l => l.id === like_id);
if(like_index == -1) return res.status(404).send('The like with the given ID was not found.');
const deleted_like = likes.splice(like_index,1);
res.send(deleted_like);
});

module.exports = like;