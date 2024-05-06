// const _ = require('lodash');
// const bcrypt = require('bcrypt');
// const jwt = require ('jsonwebtoken');
const express = require('express');
// const mongoose = require('mongoose');
// const auth = require('../middleware/auth');
const { isAdmin, adminOrId } = require('../middleware/helpers');
const { validateUser } = require('../models/user');
const {
  getUsers, getUser, updateUser, deleteAll, deleteOne,
} = require('../service/user');
const { signupUser } = require('../service/auth');
// const Joi = require('joi');

const user = express.Router();

// let users = [];
user.get('/', isAdmin, async (req, res) => {
  getUsers(res);
});

user.get('/:id', adminOrId, async (req, res) => {
  getUser(req.user._id, res);
});

user.post('/', isAdmin, async (req, res) => {
  const result = validateUser(req.body, false);
  if (result.error) return res.status(400).send(result.error.details[0].message);
  const user = result.value;
  signupUser(user, res);
});

user.put('/:id', adminOrId, async (req, res) => {
  const result = validateUser(req.body, true);
  if (result.error) return res.status(400).send(result.error.details[0].message);
  const user = result.value;
  updateUser(req.params.id, user, res);
});

user.delete('/', isAdmin, async (req, res) => {
  deleteAll(res);
});

user.delete('/:id', adminOrId, async (req, res) => {
  deleteOne(res, req.params.id);
});

module.exports = user;
