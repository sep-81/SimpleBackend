const mongoose = require('mongoose')
const Joi = require('joi')

const Posts = mongoose.model('posts', new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  text: {
    type: String
  }
}))

function validatePost (post, isUpdate) {
  const schema = Joi.object({
    title: Joi.string().alphanum().min(3).max(255),
    userId: Joi.string().alphanum().min(3).max(255),
    text: Joi.string().alphanum().min(3).max(1024)
      .optional()
  }).required().options({ stripUnknown: true })// stripUnknown: true
  if (isUpdate) {
    schema.userId = Joi.any().strip()
    return schema.validate(post)
  }
  return schema.validate(post, { presence: 'required' })
}

exports.Posts = Posts
exports.validatePost = validatePost
