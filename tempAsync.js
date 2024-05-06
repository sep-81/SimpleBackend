function ascCB () {
  const a = 'i love you babe'
  setTimeout(() => console.log('hello, and: ', a), 1000)
  console.log('hello4')
  return 56
}
function ascPR () {
  const a = 'i love you babe'
  const p = new Promise((res, rej) => {
    setTimeout(() => {
      console.log('hello, promise: ', a)
      res(68)
    }, 2000)
  })
  p.then((data) => console.log('hey', data))
  console.log('hello iam 16')
}
async function asyncAwait () {
  let p = new Promise((res, rej) => {
    setTimeout(() => {
      console.log('this is async')
      res(68)
    }, 2000)
  })
  p = await p
  console.log('before await')

  console.log('after await')
  return 'dfd'
  console.log(p)
}
function run () {
  console.log('hello')
  ascCB()
  ascPR()
  asyncAwait()
  console.log('hello2')
  return 'hello bitch async is in me'
}
// console.log(ascCB());
// ascPR();
// console.log("i am the last, last of us");
// console.log(asyncAwait().then((data) => console.log(data)));
console.log(run())
