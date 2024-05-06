const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const { LikeSchema } = require('./like');

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
    required: true,
  },
}, { _id: false });
const Users = mongoose.model('users', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
    // match: /^[a-zA-Z0-9]+$/1 },
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
    unique: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 150,
  },
  postsCreated: [postsSchema],
  postsLiked: [LikeSchema],
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (email) => String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
      message: '{VALUE} is not a valid email address',
    },
  },
  phoneNr: {
    type: String,
    match: /^\d{3}-\d{3}-\d{4}$/, //  this regex works for the format 123-456-7890
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  methods: {
    generateAuthToken() {
      const token = jwt.sign(
        { _id: this._id, username: this.username, isAdmin: this.isAdmin },
        config.get('jwtPrivateKey'),
        { expiresIn: '1h' },
      );
      return token;
    },
  },
}));
// like generateAuthToken above but it create static method instead of instance one
// UserSchema.statics.fun = function() {};
// the instance method
// UserSchema.statics.fun = function() {};
function validateUser(user, isUpdate) {
  // user.isUpdate = isUpdate;
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(255),
    username: Joi.string().alphanum().min(3).max(255)
      .when('isUpdate', { is: true, then: Joi.forbidden() }),

    email: Joi.string().email(),
    password: Joi.string().min(5).max(255).required(),
    age: Joi.number().min(0).max(150).optional(),
    phoneNr: Joi.string().trim().regex(/^\d{3}-\d{3}-\d{4}$/).optional(),
  }).min(1).options({ stripUnknown: true });// stripUnknown: true
  if (isUpdate) {
    return schema.validate(user);
  }
  return schema.validate(user, { presence: 'required' });
}

module.exports.Users = Users;
exports.validateUser = validateUser;
