pragma solidity ^0.4.11;

contract Settlement {
  bytes32 public permutationID;
  address public tokenA;
  address public tokenB;
  mapping(address => mapping(bytes32 => uint)) public orders;

  function Settlement(bytes32 permutationID, address TokenA, address TokenB) {
    permutationID = permutationID;
    tokenA = tokenA;
    tokenB = tokenB;
  }

  function broadcast(bytes32 order, uint sellAmount) {
    orders[msg.sender][order] = sellAmount;
  }
}
