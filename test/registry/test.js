const Registry = artifacts.require("Registry")
const Token = artifacts.require("Token")
const Settlement = artifacts.require("Settlement")

const { calculatePermutationID } = require('../settlement/utils.js')

const addressA = '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
const addressB = '0x6846e948d8b1ec25bb99dedf821b0d658e226595'
const permutationID = calculatePermutationID(addressA, addressB)

contract('Registry', (accounts) => {
  let settlementContract
  let registryContract

  it('Should deploy and add settlement contract to registry', () => {

    Settlement.new(permutationID, addressA, addressB)
    .then((inst) => {
      settlementContract = inst
      return Registry.new()
    }).then((inst) => {
      console.log('inst', inst)
      registryContract = inst
      return registryContract.registerPermutation.call(permutationID, settlementContract.address)
    }).then((res) => {
      console.log('res', res)
    })
  })
})
