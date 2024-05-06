const express = require('express')
// const mongoose = require('mongoose');
const { validateLike } = require('../models/like')
const { isAdmin, adminOrId } = require('../middleware/helpers')
const {
  allLikes, userLikes, addLike, editLike, deleteAllLikes, deleteOneLike
} = require('../service/like')
// const { deleteAll } = require('../service/user');

const like = express.Router()

like.get('/', adminOrId, async (req, res) => {
  allLikes(req.user.isAdmin, req.user._id, res)
  // return res.json(likes);
})

like.get('/:id', isAdmin, (req, res) => {
  userLikes(req.params.id, res)
})

like.post('/', (req, res) => {
  let postId = validateLike(req.body)
  if (postId.error) return res.status(400).send(postId.error.details[0].message)
  postId = postId.value.postId
  addLike(req.user._id, postId, res)
})

like.put('/:id', (req, res) => {
  const postId = req.params.id
  editLike(req.user._id, postId, res)
})

like.delete('/', (req, res) => {
  deleteAllLikes(req.user._id, res)
})

like.delete('/:id', (req, res) => {
  deleteOneLike(req.params.id, req.user._id, res)
})

module.exports = like
