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

/**
order1 I would like to receive price1 * quantity1
order2 I would like to recieve price2 * quantity2
*/
function matchCalculation(order1, order2) {
  return new Promise((resolve, reject) => {
    order1.receive1 = order1.price * order1.quantity
    order2.receive2 = order2.price * order2.quantity
    if (receive1 < receive2) {
      return calculateSettlement(order2, order1)
    } else {
      return calculateSettlement(order1, order2)
    }
  })
}

function calculateSettlement(order1, order2) {
  return new Promise((resolve, reject) => {
    if (inMarket(order1.price, order2.price) == false) {
      reject("prices not in the market")
    }

  })
}

function inMarket(price1, price2) {
  if (price1 <= 1/price2) {
    return true
  } else {
    return false
  }
}

function pricePreference(price1, price2) {
  const diff = price1 - 1/price2
  if (diff == 0) {
    return 0
  } else if (diff >= 0) {
    return 0
  } else {
    return 1
  }
}

function receiveAmount(price, quantity) {
  return price * quantity
}

function delay(t) {
  return new Promise((resolve) => {
    if (t <= 0) {
      console.log('here here')
      resolve(true)
    } else {
      setTimeout(resolve, t)
    }
  })
}

module.exports = {
  generateSignature,
  calculatePermutationID,
  hashOrder,
  delay,
}
