const eth = require('ethereumjs-util')
const sha3 = require('solidity-sha3').default

const { ecsign, hashPersonalMessage, ecrecover, privateToPublic } = eth

function signTest(obj) {
  return new Promise((resolve, reject) => {
    let hashedMsg
    return hashMessage(JSON.stringify(obj))
    .then((hash) => {
      hashedMessage =  Buffer.from(hash.substring(2), 'hex')
      return signOrder(hash, '65de830423de93cba6f05c4e819f757434d8c6228b4498f5c34cafac6bcd0c3d')
    }).then((res) => {
      console.log('res', res)
      return recover(hashedMessage, res.v, res.r, res.s)
    }).then((publicKey) => {
      console.log('publicKey', publicKey)
      const originalKey = privateToPublic(Buffer.from('65de830423de93cba6f05c4e819f757434d8c6228b4498f5c34cafac6bcd0c3d', 'hex')).toString('hex')
      if (publicKey.toString('hex') === originalKey) {
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
    resolve(sha3(msg))
    // resolve(hashPersonalMessage(Buffer.from(msg, 'hex')))
  })
}

function signOrder(hash, pk) {
  return new Promise((resolve, reject) => {
    resolve(ecsign(Buffer.from(hash.substring(2), 'hex'), Buffer.from(pk, 'hex')))
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
