const eth = require('ethereumjs-util')

const { ecsign, hashPersonalMessage } = eth

function signTest(obj) {
  return new Promise((resolve, reject) => {
    return hashMessage(JSON.stringify(obj))
    .then((hash) => {
      console.log('hash', hash)
    })
  })
}

function hashMessage(msg) {
  return new Promise((resolve, reject) => {
    resolve(hashPersonalMessage(Buffer.from(, 'utf8')))
  })
}

signTest()
