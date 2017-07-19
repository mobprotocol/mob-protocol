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
      supply: 1000000000,
      address: '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
    },
    {
      name: 'Basic Attention Token',
      ticker: 'BAT',
      supply: 1000000000,
      address: '0x6846e948d8b1ec25bb99dedf821b0d658e226595'
    }
  ]

  const permutationID = calculatePermutationID(tokens[0].address, tokens[1].address)
  console.log('permutationID', permutationID)
}
