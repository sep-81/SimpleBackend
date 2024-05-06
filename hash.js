const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
async function run () {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash('1234', salt)
  bcrypt.compare('pass', 'hash')
  console.log(salt)
  console.log(hash)
}
run()
const token = jwt.sign({ _id: user._id, name: 'dfesrmYname' }, 'jwtPrivateKey') // payload
console.log(token)
if (process.env.NODE_ENV === 'endProcess') {
  console.log('ending process')
  process.exit(1)
}
// setting respone header:
res.header('x-auth-token', token).send('logged in')
