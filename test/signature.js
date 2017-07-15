const eth = require('ethereumjs-util')

const { ecsign, hashPersonalMessage } = eth

console.log('ecsign', ecsign)

console.log('hashPersonaleMessage', hashPersonalMessage)


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
    resolve(hashPersonalMessage(msg))
  })
}
