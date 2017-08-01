const ethUtil = require('ethereumjs-util')
const { sha3 } = ethUtil

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const abi = require('ethereumjs-abi')
const BN = require('bn.js')

function generateSignature(publicAddress, msgHash) {
  return new Promise(async (resolve, reject) => {
    const signature = await signOrder(publicAddress, msgHash)
    let r = "0x"+signature.substr(2, 64)
    let s = "0x"+signature.substr(66, 64)
    let v = 27 + Number(signature.substr(130, 2));
    resolve([v, r, s])
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

function hashOrder(order) {
  return '0x' + abi.soliditySHA3(
    [
      'address', 'address', 'uint', 'uint',
    ],
    [
      new BN(order.seller.substr(2, order.seller.length), 16),
      new BN(order.token.substr(2, order.token.length), 16),
      10,
      10
      // new Buffer(order.permutationID.substring(2, order.permutationID.length), 'hex')
    ]
  ).toString('hex')
}

function delay(t) {
  return new Promise((resolve) => {
    if (t <= 0) {
      resolve(true)
    } else {
      setTimeout(resolve(true), t)
    }
  })
}

module.exports = {
  generateSignature,
  calculatePermutationID,
  hashOrder
}
