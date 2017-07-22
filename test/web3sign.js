var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
const sha3 = require('solidity-sha3').default

function getAddress() {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, res) => {
      if (err) { reject (err)}
      resolve(res[0])
    })
  })
}

function hashData() {
  return new Promise((resolve, reject) => {
    resolve(sha3("hello world"))
  })
}

function signature(address, msg) {
  return new Promise((resolve, reject) => {
    return web3.eth.sign(address, msg, (err, res) => {
      if (err) { reject(err) }
      resolve(res)
    })
  })
}

function test() {
  return new Promise((resolve, reject) => {
    let  addresss
    let hashedData
    return getAddress()
    .then((res) => {
      address = res
      return hashData()
    }).then((res) => {
      hashedData = res
      console.log('hash', res)
      return signature(address, hashedData)
    }).then((res) => {
      console.log(res)
      let r = "0x"+res.substring(2, 64)
      let s = "0x"+res.substr(66, 64)
      let v = 27 + Number(res.substr(130, 2));
      console.log('v', v)
      console.log('r', r)
      console.log('s', s)
    })
  })
}

test()
