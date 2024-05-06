// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const _ = require('lodash')
const { Users } = require('../models/user')

async function loginUser (input, res) {
  const user = await Users.findOne({ email: input.email })
  if (!user) return res.status(404).send('The user with the given email was not found.')
  const isPasswordMatched = await bcrypt.compare(user.password, input.password)
  if (!isPasswordMatched) return res.status(401).send('The password is incorrect.')
  const token = user.generateAuthToken()
  res.header('x-auth-token', token).send(token)
}

async function signupUser (user, res) {
  user = new Users(user)
  try {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.validate()
  } catch (err) {
    return res.status(401).send(err)
  }
  // const repeated = users.find(u => u.name == req.body.name);
  try {
    await user.save()
    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username']))
  } catch (err) {
    return res.status(501).send(err)
  }
}

module.exports = { loginUser, signupUser }
