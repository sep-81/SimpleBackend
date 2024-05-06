const mongoose = require('mongoose')
const _ = require('lodash')
const { Users } = require('../models/user')

module.exports.getUsers = async function (res) {
  try {
    let users
    users = await Users.find()
    if (users) console.log('retrieved users')
    if (users.length === 0) return res.send('No users found.')
    users = users.map((user) => _.pick(user, ['_id', 'username']))
    return res.json(users)
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports.getUser = async function (userId, res) { // one user
  try {
    const user = await Users.findById(userId)
    if (user) {
      return res.json(_.pick(user, ['_id', 'username']))
    }
    return res.status(404).send('The user with the given ID was not found.')
  } catch (err) {
    return res.status(501).send(err)
  }
}

module.exports.updateUser = async function (userId, user, res) {
  try {
    user = await Users.findByIdAndUpdate(userId, { $set: user }, { new: true })
    return res.json(_.pick(user, ['_id', 'username']))
  } catch (err) {
    return res.status(404).send(err)
  }
}

module.exports.deleteAll = async function (res) {
  try {
    await mongoose.connection.dropCollection('users')
    return res.send('users deleted')
  } catch (err) {
    return res.status(404).send(err)
  }
}

module.exports.deleteOne = async function (res, id) {
  try {
    const result = await Users.deleteOne({ _id: id })
    return res.json(_.pick(result, ['_id', 'username']))
  } catch (err) {
    return res.status(404).send(err)
  }
}
