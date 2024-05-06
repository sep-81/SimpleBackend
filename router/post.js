const express = require('express')
// const mongoose = require('mongoose');
// const _  = require('lodash');
const { Posts, validatePost } = require('../models/post')
// const Joi = require('joi');
// const { isAdmin, adminOrId } = require('../middleware/helpers');
// const { Users } = require('../models/user');
const {
  editPost, getPosts, getPost, addPost, deleteAllPosts, deleteOnePost
} = require('../service/post')

const post = express.Router()

post.get('/', async (req, res) => {
  getPosts(req.user._id, req.user.isAdmin, res)
})

post.get('/:id', async (req, res) => {
  getPost(req.user._id, req.user.isAdmin, req.params.id, res)
})

post.post('/', async (req, res) => {
  const result = validatePost(req.body, false)
  if (result.error) {
    return res.status(400).send(result.error.details[0].message)
  }
  addPost(req.user._id, result.value, res)
})

post.put('/:id', async (req, res) => {
  let post = validatePost(req.body, true)
  if (post.error) return res.status(400).send(post.error.details[0].message)
  post = post.value
  editPost(req.params.id, req.user._id, post, res)
})

post.delete('/', async (req, res) => {
  deleteAllPosts(req.user._id, res)
})

post.delete('/:id', (req, res) => {
  deleteOnePost(req.user._id, req.params.id, res)
})

module.exports = post
