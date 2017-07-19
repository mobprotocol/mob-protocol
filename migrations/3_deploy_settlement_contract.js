const Settlement = artifacts.require('Settlement')

const ethUtil = require('ethereumjs-util')
const { sha3 } = ethUtil

function calculatePermutationID(addressA, addressB) {
  const ordering = addressA.localeCompare(addressB)
  console.log('ordering', ordering)
  let concated
  if(ordering == 0) {
    concated = `${addressA}${addressB}`
  } else {
    concated = `${addressB}${addressA}`
  }
  console.log('concated', concated)
  return '0x' + sha3(concated)
}

module.exports = (deployer) => {
  const tokens = [
    {
      name: 'Mob',
      ticker: 'MOB',
      supply: 1000000000
    },
    {
      name: 'Basic Attention Token',
      ticker: 'BAT',
      supply: 1000000000
    }
  ]

  const permutationID = calculatePermutationID()
  console.log('permutationID', permutationID)
}
