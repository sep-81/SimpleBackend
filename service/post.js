const Fawn = require('fawn');
const mongoose = require('mongoose');
const { Users } = require('../models/user');
const { Posts } = require('../models/post');

Fawn.init(mongoose);
module.exports.getPosts = async function (userId, isAdmin, res) {
  try {
    const query = isAdmin
      ? {
        $or: [
          { isAdmin: true, _id: userId },
          { isAdmin: false }],
      }
      : { _id: userId };
    const posts = await Users.find(query, '-_id username postsCreated')
      .populate('postsCreated.postId', '-_id title content');
    return res.send(posts);
  } catch (err) {
    return res.status(501).send(err);
  }
};

module.exports.getPost = async function (userId, isAdmin, postId, res) {
  try {
    let post;
    if (isAdmin) {
      post = await Posts.findById(postId);
      if (!post) return res.status(404).send('The post with the given ID was not found.');
    } else {
      const postIds = await Users.findById(userId, '-_id postsCreated');
      if (postIds.some((p) => p.postId == postId)) {
        post = await Posts.findById(postId);
      } else {
        return res.status(404).send('You can only see your posts');
      }
    }
    return res.json(post);
  } catch (err) {
    return res.status(501).send(err);
  }
};

module.exports.addPost = async function (userId, post, res) {
  post = new Posts(post);
  try {
    // try transaction here

    await new Fawn.Task()
      .save('posts', post)
      .update('users', { _id: userId }, { $push: { postsCreated: { title: post.title, postId: post.postId } } })
      .run();
    res.send(post);
  } catch (err) {
    return res.status(501).send(err);
  }
};

module.exports.editPost = async function (postId, userId, post, res) {
  try {
    if (post.title) {
      // transaction here
      const result = await Users
        .updateOne(
          { _id: userId, 'postCreated.postId': postId },
          { $set: { 'postsCreated.$.title': post.title } },
          { new: true },
        );
      if (result.modifiedCount == 0) return res.status(404).send('The post with the given ID was not found.');
      console.log(result.modifiedCount);
      post = await Posts
        .findByIdAndUpdate(postId, post, { new: true, fields: 'title' });
      return res.send(post);
    }
    post = await Posts
      .findOneAndUpdate(
        { _id: postId, userId },
        post,
        { new: true, fields: 'title' },
      );
    if (!post) return res.status(404).send('The post with the given ID was not found.');
    return res.send(post);
  } catch (err) {
    return res.status(501).send(err);
  }
};

module.exports.deleteAllPosts = async function (userId, res) {
  try {
    await Posts.deleteMany({ userId });
    res.send('All posts deleted');
  } catch (err) {
    return res.status(501).send(err);
  }
};

module.exports.deleteOnePost = async function (userId, postId, res) {
  try {
    const user = await Users.findOne({ _id: userId, 'postsCreated.postId': postId }, '_id');
    if (!user) return res.status(404).send('The post with the given ID was not found.');
    const post = await Posts.findByIdAndDelete(postId);
    res.send('Post deleted', post);
  } catch (err) {
    return res.status(501).send(err);
  }
};
