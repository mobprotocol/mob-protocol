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

  function matchOrder(bytes32 order, uint8 v, bytes32 r, bytes32 s) returns (bool) {
    // verify order

    // verify orders are in the market

    // verify approvals

    // verify sendAmounts

    // transfer tokens

    return true;
  }

  function verifyOrder(bytes32[3] sig, bytes32 permutation, address sellToken, uint amount, uint price) returns (bool) {
    bytes memory prefix = "\x19Ethereum Signed Message:\n32";
    bytes32 msg = sha3(prefix, permutation, sellToken, amount, price);
    address seller1 = ecrecover(msg, v, r, s);
  }

  function priceInMarket(uint price1, uint price2) returns (uint) {
    uint memory invertedPrice = 1/price2;
    return invertedPrice;
  }

  function getSender() returns (address) {
      return msg.sender;
  }
}
/**
Testing Inputs:

"0x8550e43dd8cc744ac8ccd7b7d160484b9a338c0f", "0x8550e43dd8cc744ac8ccd7b7d160484b9a338c0f", "0x8550e43dd8cc744ac8ccd7b7d160484b9a338c0f"
