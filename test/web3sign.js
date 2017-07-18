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

function signature() {
  return new Promise((resolve, reject) => {

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
      console.log('res', res)
      hashedData = res
    })
  })
}

test()
