const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongoDemo')
  .then(() => console.log('connected to mongoDB'))
  .catch(err => console.error('could not connect to mongoDB..', err))
const PostShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    // match: /^[a-zA-Z0-9]+$/1 },
    lowercase: true,
    trime: true
  },
  author: {
    type: String,
    required: true,
    enum: ['author1', 'author2', 'author3']
  },
  age: Number,
  tags: {
    type: Array,
    required: true,
    validate: {
      validator: function (v) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = (v && v.length > 0)
            console.log('the custom: ', result)
            resolve(result)
            // return callback(result);
            // return result;
          }, 2000)
        })
        // return (v && v.length > 0);
      },
      message: 'A post must have at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean, // type: Buffer
  price: {
    type: Number,
    required: function () { return this.isPublished }, // this == post
    min: 10,
    max: 200, // also for date
    get: v => Math.round(v),
    set: v => Math.round(v)
  }

})

const Post = mongoose.model('MyPost', PostShema)// collection
async function createPost () {
  const post = new Post({
    name: 'my first post',
    author: 'author1',
    age: 35
    // tags: ["tag1", "tag2"],
  })

  try {
    post.validate().catch(err => console.log(Object.keys(err), err.message))
    console.log('yes its correct')
    /* const result = await post.save();
    console.log("hello\n\n",result); */
  } catch (err) {
    console.log(Object.keys(err), 'lastCatch\n\n', err.message)
  }
}

async function getPosts () {
  const posts = await Post
    .find({ name: 'my first post' }, { author: { $in: ['author1', 'author2'] } })
    .or({ age: { $gte: 35 } }, { age: { $lte: 20 } })

  console.log(posts)
}

createPost()
