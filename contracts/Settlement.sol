pragma solidity ^0.4.11;
import 'SafeMath.sol'

contract Settlement is SafeMath {
  address public permutationID;
  address public tokenA;
  address public tokenB;

  mapping(address => mapping(bytes32 => uint)) public orders;

  event orderBroadcast(address sender, bytes32 order, uint amount, bytes32 price);

  function Settlement(address _permutationID, address _tokenA, address _tokenB) {
    permutationID = _permutationID;
    tokenA = _tokenA;
    tokenB = _tokenB;
  }

  function broadcast(bytes32 order, uint sellAmount, bytes32 price) returns (bool) {
    orderBroadcast(msg.sender, order, sellAmount, price);
    orders[msg.sender][order] = sellAmount;
    return true;
  }

  function testSha3() returns (bytes32) {
     return sha3('hello world');
  }

  function testKeccack256() returns (bytes32) {
    return keccak256('hello world');
  }

  function matchOrder(bytes32 order, uint8 v, bytes32 r, bytes32 s) returns (address) {
    // ecrecover public key

    bytes memory prefix = "\x19Ethereum Signed Message:\n32";
    bytes32 msg = sha3(prefix, order);
    address seller1 = ecrecover(msg, v, r, s);

    // verify public key is
    return seller1;

    // verify orders are in the market

    // verify approvals

    // verify sendAmounts

    // transfer tokens

  }

  function verifyOrder() {

  }

  function inMarket(uint priceA, uint priceB) {

  }


  function getSender() returns (address) {
      return msg.sender;
  }
}
/**
Testing Inputs:

"0x8550e43dd8cc744ac8ccd7b7d160484b9a338c0f", "0x8550e43dd8cc744ac8ccd7b7d160484b9a338c0f", "0x8550e43dd8cc744ac8ccd7b7d160484b9a338c0f"

"0x8550e43dd8cc744ac8ccd7b7d160484b9a338c0f", 10

"0xca35b7d915458ef540ade6068dfe2f44e8fa733c", "0x8550e43dd8cc744ac8ccd7b7d160484b9a338c0f"

hash 5f35dce98ba4fba25530a026ed80b2cecdaa31091ba4958b99b52ea1d068adad
v 28
r db2a4be65acd91428fb1094d474a1e48ae787464dcc0bf65674d4673ea8f63a5
s 723b41c020c59b86016e05ddcfc16dd0cd0a824d7ebf7dd690894b2aae0407b8

"0x5f35dce98ba4fba25530a026ed80b2cecdaa31091ba4958b99b52ea1d068adad", 28, "0xdb2a4be65acd91428fb1094d474a1e48ae787464dcc0bf65674d4673ea8f63a5", "0x723b41c020c59b86016e05ddcfc16dd0cd0a824d7ebf7dd690894b2aae0407b8"

hash 0xbd0e658068098ef34f3708ac62a92f641560051916f3660c631416efb0ef2035
bd0e658068098ef34f3708ac62a92f641560051916f3660c631416efb0ef2035
hash string string 0xbd0e658068098ef34f3708ac62a92f641560051916f3660c631416efb0ef2035
hash <Buffer >
pk string string 65de830423de93cba6f05c4e819f757434d8c6228b4498f5c34cafac6bcd0c3d
v 28
r aa5725f6f304f36dccbef10a4ef7b126a940cb173dbca3c516bcf0ba13327887
s 6ca6c77913060ebc2cbf2666a1f9a3d3a7fecabfeb2cbc436a3df3cedf8b5618

"bd0e658068098ef34f3708ac62a92f641560051916f3660c631416efb0ef2035",  28,  "aa5725f6f304f36dccbef10a4ef7b126a940cb173dbca3c516bcf0ba13327887",  "6ca6c77913060ebc2cbf2666a1f9a3d3a7fecabfeb2cbc436a3df3cedf8b5618"

hash 0xbd0e658068098ef34f3708ac62a92f641560051916f3660c631416efb0ef2035
v 28
r aa5725f6f304f36dccbef10a4ef7b126a940cb173dbca3c516bcf0ba13327887
s 6ca6c77913060ebc2cbf2666a1f9a3d3a7fecabfeb2cbc436a3df3cedf8b5618

"0xbd0e658068098ef34f3708ac62a92f641560051916f3660c631416efb0ef2035", 27, "0xaa5725f6f304f36dccbef10a4ef7b126a940cb173dbca3c516bcf0ba13327887", "0x6ca6c77913060ebc2cbf2666a1f9a3d3a7fecabfeb2cbc436a3df3cedf8b5618"

0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad, 27, "0x3063855ca453ffc5afdedef5b5dd22b20c1472996746ab44df0fbc483409bb17", "0x0f4ff2b3f01972086ef6151236d357d0ab29fc14eeef42cad184c128e7ad0f0a"

27, "0x3063855ca453ffc5afdedef5b5dd22b20c1472996746ab44df0fbc483409bb17, "0x0f4ff2b3f01972086ef6151236d357d0ab29fc14eeef42cad184c128e7ad0f0a"

"0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad", 27, "0x49d65fe03366fa1f27560c7e6cfe3ceacace36008578484b1411c3d8724345", "0x534225ea8534737b9c4db46647206334e3196d28f3b02b4461cd63db1e8be67b"
