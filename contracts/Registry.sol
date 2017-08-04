pragma solidity ^0.4.11;

contract Registry {
  mapping(bytes32 => address) public registry;

  function registerPermutation(bytes32 permutationID, address settlementContract) returns (bool) {
    registry[permutationID] = settlementContract;
  }

  function permutationExists(bytes32 permutationID) returns (bool) {
    if(registry[permutationID] == 0) {
      return true;
    } else {
      return false;
    }
  }
}
