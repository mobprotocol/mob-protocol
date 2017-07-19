// module.exports = function(deployer) {
//   deployer.deploy(ConvertLib);
//   deployer.autolink();
//   deployer.deploy(MetaCoin);
// };
const SafeMath = artifacts.require("SafeMath")
const Token = artifacts.require("Token")

module.exports = function(deployer) {
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

  deployer.deploy(SafeMath)
  deployer.deploy(Token)

  tokens.forEach((token) => {
    console.log('token', token)
    Token.new(token.name, token.ticker, token.supply)
  })
}
