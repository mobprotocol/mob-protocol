const eth = require('ethereumjs-util')

const { ecsign, hashPersonalMessage, ecrecover, privateToPublic } = eth

function signTest(obj) {
  return new Promise((resolve, reject) => {
    let hashedMsg
    return hashMessage(JSON.stringify(obj))
    .then((hash) => {
      console.log('hash', hash.toString('hex'))
      hashedMsg = hash
      return signOrder(hash.toString('hex'), '65de830423de93cba6f05c4e819f757434d8c6228b4498f5c34cafac6bcd0c3d')
    }).then((res) => {
      console.log('v', res.v)
      console.log('r', res.r.toString('hex'))
      console.log('s', res.s.toString('hex'))
      return recover(hashedMsg, res.v, res.r, res.s)
    }).then((publicKey) => {
      console.log('publicKey', publicKey.toString('hex'))
      const originalKey = privateToPublic(Buffer.from('65de830423de93cba6f05c4e819f757434d8c6228b4498f5c34cafac6bcd0c3d', 'hex'))
      console.log('originalkey', originalKey.toString('hex'))
      if (publicKey == originalKey.toString('hex')) {
        console.log('boom! ecrecover works')
      } else {
        console.log('public keys did not match')
      }
      resolve(true)
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

function recover(hash, v, r, s) {
  return new Promise((resolve, reject) => {
    resolve(ecrecover(hash, v, r, s))
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
