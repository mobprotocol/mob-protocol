const ethUtil = require('ethereumjs-util')
const soliditysha3 = require('solidity-sha3').default

const { hashPersonalMessage, sha3 } = ethUtil;

const input = Buffer.from('hello world', 'hex')

console.log('hashPersonalMessage', hashPersonalMessage(input).toString('hex'))
console.log('sha3', sha3('hello world').toString('hex'))


/**
solidity sha3:  0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
solidity keccak256: 0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
js keccack256: 0x5f35dce98ba4fba25530a026ed80b2cecdaa31091ba4958b99b52ea1d068adad
js solidty-sha3: 0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
js sha3 (ethereumjs-util): 0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
*/
