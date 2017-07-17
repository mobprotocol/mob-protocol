pragma solidity ^0.4.11;

contract Settlement {
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

  function matchOrder(bytes32 order1, uint8 v, bytes32 r, bytes32 s) returns (address) {
    // ecrecover public keys
    address seller1 = ecrecover(order1, v, r, s);
    return seller1;

    // verify orders are in the market

    // verify approvals

    // verify sendAmounts

    // transfer tokens

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
