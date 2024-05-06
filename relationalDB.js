const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const Fawn = require('fawn')

mongoose.connect('mongodb://localhost/mongoDemo')
  .then(() => console.log('connected to mongoDB'))
  .catch((err) => console.error('could not connect to mongoDB..', err))
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
      validator (v) {
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
    required () { return this.isPublished }, // this == post
    min: 10,
    max: 200, // also for date
    get: (v) => Math.round(v),
    set: (v) => Math.round(v)
  }

})
// Fawn.init(mongoose);
// global.Fawn = Fawn;
// exports.Fawn = Fawn;

const MovieSchema = new mongoose.Schema({
  name: String,
  length: Number,
  releaseDate: Date,
  cast: [String]
})
const Movie = mongoose.model('Movies', MovieSchema)// collection
async function createMovie () {
  const myMovie = new Movie({
    name: 'my first movie',
    length: 120,
    releaseDate: new Date(),
    cast: ['actor1', 'actor2']
  })
  try {
    const result = await myMovie.save()
    console.log('yes its correct, Movie name : ', result.name)
  } catch (err) {
    console.log(Object.keys(err), 'lastCatch\n\n', err.message)
  }
}
// createMovie();

const RentalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: Number,
  movie: {
    type: new mongoose.Schema({
      name: String,
      length: Number
    }),
    required: true
  }

})
const Rental = mongoose.model('Rental', RentalSchema)// collection
async function createRental () {
  const myRental = new Rental({
    name: 'my second rental',
    price: 120,
    movie: {
      name: 'my first movie',
      length: 120
      // _id: "62f9eb64fbdfb837f2befcf3" // new mongoose.Types.ObjectId(),
    }
  })
  try {
    const result = await myRental.save()
    console.log('yes its correct, Rental name: ', result.name)
  } catch (err) {
    console.log(Object.keys(err), 'lastCatch\n\n', err.message)
  }
}
createRental()
