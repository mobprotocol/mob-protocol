const ethUtil = require('ethereumjs-util')
const { sha3 } = ethUtil

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

function generateSignature(publicAddress, msg) {
  return new Promise(async (resolve, reject) => {
    const hashedMsg = sha3(msg)
    const signature = await signOrder(publicAddress, hashedMsg.toString('hex'))
    resolve(hashedMsg)
  })
}

async function signOrder(address, hash) {
  return new Promise((resolve, reject) => {
    web3.eth.sign(address, hash, (err, res) => {
      if (err) { reject(err) }
      console.log('res', res)
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

module.exports = {
  generateSignature,
  calculatePermutationID
}
