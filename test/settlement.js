/**
  unit tess for Settlement.sol
*/

const Settlement = artifacts.require("Settlement")

contract('Settlement' , (accounts) => {
  it("Should return false given a public address and the wrong vrs signature", () => {
    let instance
    return Settlement.deployed()
    .then((inst) => {
      instance = inst
      console.log('instance', instance)
      // return generateSignature(accounts[0], "hello world")
    })
  })
  console.log('accounts', accounts)
})
