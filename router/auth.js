const _ = require('lodash')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const express = require('express')
const mongoose = require('mongoose')
const { Users, validateUser: valCrUser } = require('../models/user')
const { loginUser, signupUser } = require('../service/auth')
// const Joi = require('joi');

const auth = express.Router()

auth.post('/login', async (req, res) => {
  const result = validateUser(req.body)
  if (result.error) return res.status(400).send(result.error.details[0].message)
  const input = result.value
  try {
    loginUser(input)
  } catch (err) {
    return res.status(401).send(err)
  }
})

auth.post('/signup', async (req, res) => {
  const result = valCrUser(req.body, false)
  if (result.error) return res.status(400).send(result.error.details[0].message)
  const user = result.value
  signupUser(user)
})

function validateUser (user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(255).required()
  }).options({ stripUnknown: true })
  return schema.validate(user)
}

module.exports = auth
