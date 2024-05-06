const mongoose = require('mongoose')
const Joi = require('joi')

const LikeSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
    required: true
    // unique: true, // not only deosn't have any effect but also make problems
  }
}, { _id: false, timestamps: true })

function validateLike (like) {
  const schema = Joi.object({
    postId: Joi.string().alphanum().min(3).max(255)
      .required()
    // userId: Joi.string().alphanum().min(3).max(255),
  }).options({ stripUnkonw: true })// stripUnknown: true
  return schema.validate(like)
}

exports.LikeSchema = LikeSchema
exports.validateLike = validateLike
