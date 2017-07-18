const ethUtil = require('ethereumjs-util')
const sha3 = require('solidity-sha3')

const { hashPersonalMessage, sha3 } = ethUtil;

const input = Buffer.from('hello world', 'hex')

console.log('hashPersonalMessage', hashPersonalMessage(input))
