var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

function getAddress() {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, res) => {
      if (err) { reject (err)}
      resolve(res)
    })
  })
}

function hashData() {
  return new Promise((resolve, reject) => {

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
      console.log('res', res)
    })
  })
}

test()
