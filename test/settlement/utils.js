const ethUtil = require('ethereumjs-util')
const { sha3 } = ethUtil

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

export function generateSignature(publicAddress, msg) {
  return new Promise((resolve, reject) => {
    const hashedMsg = sha3(msg)
    return signOrder(publicAddress, hashedMsg)

  })
}

function signOrder(address, hash) {
  return new Promise((resolve, reject) => {

  })
}
