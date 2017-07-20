const ethUtil = require('ethereumjs-util')
const { sha3 } = ethUtil

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const abi = require('ethereumjs-abi')
const BN = require('bn.js')

function generateSignature(publicAddress, msg) {
  return new Promise(async (resolve, reject) => {
    const hashedMsg = '0x' + sha3(msg).toString('hex')
    const signature = await signOrder(publicAddress, hashedMsg)
    let r = "0x"+signature.substr(2, 64)
    let s = "0x"+signature.substr(66, 64)
    let v = 27 + Number(signature.substr(130, 2));
    resolve([hashedMsg, v, r, s])
  })
}

async function signOrder(address, hash) {
  return new Promise((resolve, reject) => {
    web3.eth.sign(address, hash, (err, res) => {
      if (err) { reject(err) }
      resolve(res)
    })
  })
}

function calculatePermutationID(addressA, addressB) {
  const ordering = addressA.localeCompare(addressB)
  let concated
  if(ordering == 0) {
    concated = `${addressA}${addressB}`
  } else {
    concated = `${addressB}${addressA}`
  }
  return '0x' + sha3(concated).toString('hex')
}

function hashOrder(obj) {
  return new Promise((resolve, reject) => {
    let params = []
    Object.keys(obj).map((param) => {
      params.push[obj[param]]
    })
    resolve('0x' + sha3(params).toString('hex'))
  })
}

function hashOrder(order) {
  abi.solidity(
    ['address', 'address', 'bytes32', 'uint', 'uint'],
    [ new BN(order.seller), new BN(order.token), new BN(order.permutationID), order.quantity, order.price]
  ).toString('hex')


}

module.exports = {
  generateSignature,
  calculatePermutationID,
  hashOrder
}
