pragma solidity ^0.4.11;

contract Settlement {
  bytes32 public permutationID;
  address public tokenA;
  address public tokenB;
  mapping(address => mapping(bytes32 => uint)) public orders;

  function Settlement(bytes32 _permutationID, address _tokenA, address _tokenB) {
    permutationID = _permutationID;
    tokenA = _tokenA;
    tokenB = _tokenB;
  }

  function broadcast(bytes32 order, uint sellAmount) {
    orders[msg.sender][order] = sellAmount;
  }
}
/**
Testing Inputs:

"0x8550e43dd8cc744ac8ccd7b7d160484b9a338c0f", "0x8550e43dd8cc744ac8ccd7b7d160484b9a338c0f", "0x8550e43dd8cc744ac8ccd7b7d160484b9a338c0f"
