/**
  unit tess for Settlement.sol
*/

const Settlement = artifacts.require("Settlement")

const { generateSignature, calculatePermutationID } = require('./utils.js')

contract('Settlement' , (accounts) => {
  it("Should deploy contract and define global permutation id", () => {
    const addressA = '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
    const addressB = '0x6846e948d8b1ec25bb99dedf821b0d658e226595'
    const permutationID = calculatePermutationID(addressA, addressB)
    Settlement.new(permutationID, addressA, addressB)
    .then((instance) => {
      return instance.permutationID.call()
    }).then((permutation) =>{
      assert.equal(permutation, permutationID, "permutation id is wrong")
    })
  })

  it("Should return false given a vrs signature from another public address than the seller", () => {
    let instance
    let signature
    const addressA = '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
    const addressB = '0x6846e948d8b1ec25bb99dedf821b0d658e226595'
    const permutationID = calculatePermutationID(addressA, addressB)
    Settlement.new(permutationID, addressA, addressB)
    .then((inst) => {
      instance = inst
      console.log('accounts[0]', accounts[0])
      return generateSignature(accounts[0], "hello world")
    }).then((signature) => {
      console.log('signature', signature)
    })
  })
})
