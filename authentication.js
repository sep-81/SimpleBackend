const mongoose = require('mongoose')
const express = require('express')
const _ = require('lodash')
const app = express()
const UserRouter = express.Router()

const UserSchema = new mongoose.Shema({
  name: { type: String, required: true, unqiue: true },
  age: {
    type: Number,
    min: 18,
    max: 99
  }
})
const User = mongoose.model('User', UserSchema)// collection

async function checkUser () {
  const user = await User.findOne({ name: 'user1' })
}
