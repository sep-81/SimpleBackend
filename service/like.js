const { Users } = require('../models/user');
const { Posts } = require('../models/post');
// const like = require('../router/like');
// const user = require('../router/user');

module.exports.allLikes = async function (isAdmin, userId, res) {
  try {
    if (!isAdmin) {
      module.exports.userLikes(userId, res);
    } else {
      const likes = await Users.find({}, 'postsLiked username').populate('postsLiked.postId', 'title');
      if (likes.length == 0) return res.send('No users found.');
      res.send(likes);
    }
  } catch (err) {
    return res.status(501).send(err);
  }
};

module.exports.userLikes = async function (userId, res) {
  try {
    const likes = await Users.findById(userId, 'postsLiked username')
      .populate('postsLiked.postId', 'title');
    if (likes) return res.send(likes);
    return res.send('user not found.');
  } catch (err) {
    return res.status(501).send(err);
  }
};

module.exports.addLike = async function (userId, postId, res) {
  try {
    const user = await Users.findById(userId, 'postsLiked username');
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    const likes = Array(user.postsLiked);
    if (likes.some((like) => like.postId == postId)) return res.send('The user already liked this post.');
    const post = await Posts.findById(postId, 'title');
    if (!post) return res.status(404).send('The post with the given ID was not found.');
    user.postsLiked.push({ postId });
    await user.save();
    return res.send(user, post);
  } catch (err) {
    return res.status(501).send(err);
  }
};

module.exports.editLike = async function (userId, postId, res) { // the same as addLike
  try {
    const post = await Posts.findById(postId, 'title');
    if (!post) return res.status(404).send('The post with the given ID was not found.');
    const result = await Users
      .findByOneAndUpdate(
        { _id: userId, 'postsLiked.postId': { $ne: postId } },
        { $push: { postsLiked: { postId } } },
        { new: true },
      );
    if (!result) return res.status(404).send('The user with the given ID was not found.');
    return res.send(result);
  } catch (err) {
    return res.status(501).send(err);
  }
};

module.exports.deleteAllLikes = async function (userId, res) {
  try {
    const curUser = await Users.findByIdAndUpdate(userId, { postsLiked: [] }, { new: true });
    if (!curUser) res.send('No user found.');
    const result = ['username', 'postsLiked'].reduce((result, key) => {
      result[key] = curUser[key];
      return result;
    }, {});
    return res.send(result);
  } catch (err) {
    return res.status(501).send();
  }
};

module.exports.deleteOneLike = async function (postId, userId, res) {
  try {
    const curUser = await Users.findById(userId, 'postsLiked username');
    if (!curUser) return res.status(404).send('The user with the given ID was not found.');
    const likes = Array(curUser.postsLiked);
    if (!likes.some((like) => like.postId == postId)) return res.send('user already does not like this post.');
    const post = await Posts.findById(postId, 'title');
    likes.splice(likes.findIndex((like) => like.postId == postId), 1);
    curUser.postsLiked = likes;
    await curUser.save();
    return res.send(curUser, post);
  } catch (err) {
    return res.status(501).send(err);
  }
};
