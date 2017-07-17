pragma solidity ^0.4.11;

contract Settlement {
  bytes32 public permutationID;
  address public tokenA;
  address public tokenB;

  mapping(address => mapping(bytes32 => uint)) public orders;

  event orderBroadcast(address sender, bytes32 order, uint amount, bytes32 price);

  function Settlement(bytes32 _permutationID, address _tokenA, address _tokenB) {
    permutationID = _permutationID;
    tokenA = _tokenA;
    tokenB = _tokenB;
  }

  function broadcast(bytes32 order, uint sellAmount, bytes32 price) returns (bool){
    orderBroadcast(msg.sender, order, sellAmount, price);
    orders[msg.sender][order] = sellAmount;
    return true;
  }

  function match(bytes32 order1, bytes32[3] sig1) returns (address){
    // ecrecover public keys
    address seller1 = ecrecover(order1, sig1[1], sig1[2], sig1[3]);
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