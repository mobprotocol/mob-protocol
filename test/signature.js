const eth = require('ethereumjs-util')

const { ecsign, hashPersonalMessage } = eth

function signTest(obj) {
  return new Promise((resolve, reject) => {
    return hashMessage(JSON.stringify(obj))
    .then((hash) => {
      return signOrder(hash.toString('hex'), '65de830423de93cba6f05c4e819f757434d8c6228b4498f5c34cafac6bcd0c3d')
    }).then((res) => {
      console.log('res', res)
    }).catch((err) => {
      reject(err)
    })
  })
}

function hashMessage(msg) {
  return new Promise((resolve, reject) => {
    resolve(hashPersonalMessage(Buffer.from(msg, 'hex')))
  })
}

function signOrder(hash, pk) {
  return new Promise((resolve, reject) => {
    resolve(ecsign(Buffer.from(hash, 'hex'), Buffer.from(pk, 'hex')))
  })
}

const order = {
  seller: '',
  amount: '',
  price: '',
  tokenSell: '',
  tokenBuy: '',
  permutation: ''
}

signTest(order)
