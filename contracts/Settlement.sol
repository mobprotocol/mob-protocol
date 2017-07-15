pragma solidity ^0.4.11;

contract Settlement {
  bytes32 public permutationID;
  address public tokenA;
  address public tokenB;

  function Settlement(bytes32 permutationID, address TokenA, address TokenB) {
    permutationID = permutationID;
    tokenA = tokenA;
    tokenB = tokenB;
  }
}
