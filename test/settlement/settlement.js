/**
  unit tess for Settlement.sol
*/

const Settlement = artifacts.require("Settlement")

const { generateSignature, claculatePermutationID } = require('./utils.js')

contract('Settlement' , (accounts) => {
  // it("Should return false given a public address and the wrong vrs signature", () => {
  //   let instance
  //   return Settlement.deployed()
  //   .then((inst) => {
  //     instance = inst
  //     return generateSignature(accounts[0], "hello world")
  //   }).then((signature) => {
  //     console.log('signature')
  //   })
  // })
  it("Should deploy contract and define global permutation id", () => {
    const addressA = '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
    const addressB = '0x6846e948d8b1ec25bb99dedf821b0d658e226595'
    const permutationID = calculatePermutationID(addressA, addressB)
    const instance = Settlement.deployed(permutationID, addressA, addressB)
    const contractPermID = instance.permutationID.call(accounts[0])
    assert.equal(contractPermID, permutationID, "permutation id is wrong")
  })
})
