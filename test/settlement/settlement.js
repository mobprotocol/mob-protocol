/**
  unit tess for Settlement.sol
*/

const Settlement = artifacts.require("Settlement")
const Token = artifacts.require("Token")

const { generateSignature, calculatePermutationID, hashOrder } = require('./utils.js')

contract('Settlement' , (accounts) => {
  it("Should deploy contract and define global permutation id", () => {
    const addressA = '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
    const addressB = '0x6846e948d8b1ec25bb99dedf821b0d658e226595'
    const permutationID = calculatePermutationID(addressA, addressB)
    Settlement.new(permutationID, addressA, addressB)
    .then((instance) => {
      return instance.permutationID.call()
    }).then((permutation) =>{
      assert.equal(permutation, permutationID)
    })
  })

  it("Signature verifiaction should return false given a vrs signature from another public address than the seller", () => {
    let instance
    let signature
    let msgHash
    const addressA = '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
    const addressB = '0x6846e948d8b1ec25bb99dedf821b0d658e226595'
    const permutationID = calculatePermutationID(addressA, addressB)
    const order = {
      seller: accounts[0],
      token: addressA,
      quantity: 10,
      price: 10,
      permutationID: permutationID,
    }
    Settlement.new(permutationID, addressA, addressB)
    .then((inst) => {
      instance = inst
      return hashOrder(order)
    }).then((hash) => {
      msgHash = hash
      return generateSignature(accounts[0], hash)
    }).then((signature) => {
      return instance.verifySignature.call(msgHash, signature[0], signature[1], signature[2], accounts[1])
    }).then((bool) => {
      assert.equal(bool, false)
    })
  })

  it("Signature verification should return true given vrs signature and address of signer", () => {
    let instance
    let signature
    let msgHash
    const addressA = '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
    const addressB = '0x6846e948d8b1ec25bb99dedf821b0d658e226595'
    const permutationID = calculatePermutationID(addressA, addressB)
    const order = {
      seller: accounts[0],
      token: addressA,
      quantity: 10,
      price: 10,
      permutationID: permutationID,
    }
    Settlement.new(permutationID, addressA, addressB)
    .then((inst) => {
      instance = inst
      return hashOrder(order)
    }).then((hash) => {
      msgHash = hash
      return generateSignature(accounts[0], hash)
    }).then((signature) => {
      return instance.verifySignature.call(msgHash, signature[0], signature[1], signature[2], accounts[0])
    }).then((bool) => {
      assert.equal(bool, true)
    })
  })

  it("Order verification should return the same bytes32 hash given correct params", () => {
    let instance
    const addressA = '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
    const addressB = '0x6846e948d8b1ec25bb99dedf821b0d658e226595'
    const permutationID = calculatePermutationID(addressA, addressB)
    const order = {
      seller: accounts[0],
      token: addressA,
      quantity: 10,
      price: 10,
      permutationID: permutationID,
    }
    const orderHash = hashOrder(order)
    Settlement.new(permutationID, addressA, addressB)
    .then((inst) => {
      instance = inst
      return inst.permutationID.call()
    }).then((perm) => {
      return instance.verifyOrder.call(order.seller, order.token, order.quantity, order.price, orderHash)
    }).then((bool) => {
      assert.equal(bool, true)
    })
  })

  it('Should verify that approval balance is greater than order amount', () => {
    let settlementContract
    let tokenContract
    const addressA = '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
    const addressB = '0x6846e948d8b1ec25bb99dedf821b0d658e226595'
    const permutationID = calculatePermutationID(addressA, addressB)

    Settlement.new(permutationID, addressA, addressB)
    .then((inst) => {
      settlementContract = inst
      return Token.new('Mob', 'MOB', 1000)
    }).then((inst) => {
      tokenContract = inst
      return inst.approve(settlementContract.address, 500)
    }).then((res) => {
      return settlementContract.verifyAllowance.call(tokenContract.address, accounts[0], 500)
    }).then((res) => {
      assert.equal(res, true)
    })
  })

  // it('Should verify orders are in the market', () => {
  //   let settlementContract
  //   let tokenContract
  //   const addressA = '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
  //   const addressB = '0x6846e948d8b1ec25bb99dedf821b0d658e226595'
  //   const permutationID = calculatePermutationID(addressA, addressB)
  //   Settlement.new(permutationID, addressA, addressB)
  //   .then((inst) => {
  //     return inst.verify
  //   })
  // })

  //
  // it("Match function should throw given incorrect order params", () => {
  //   let instance
  //   let msgHash
  //   const addressA = '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
  //   const addressB = '0x6846e948d8b1ec25bb99dedf821b0d658e226595'
  //   const permutationID = calculatePermutationID(addressA, addressB)
  //   const order = {
  //     seller: accounts[0],
  //     token: addressA,
  //     quantity: 10,
  //     price: 10,
  //     permutationID: permutationID,
  //   }
  //   const orderHash = hashOrder(order)
  //   Settlement.new(permutationID, addressA, addressB)
  //   .then((inst) => {
  //     instance = inst
  //     return hashOrder(order)
  //   }).then((hash) => {
  //     msgHash = hash
  //     return generateSignature(accounts[], orderHash)
  //   }).then((signature) => {
  //
  //   })
  // })
})
