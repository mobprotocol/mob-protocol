pragma solidity ^0.4.11;

contract EdgeRegistry {
  mapping(bytes32 => address) public registry;

  function registerPermutation(bytes32 permuationID, address settlementContract) returns (bool) {
    registry[permutationID] = settlementContract;
  }

}
