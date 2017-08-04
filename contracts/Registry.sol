pragma solidity ^0.4.11;

contract Registry {

  mapping(bytes32 => address) public registry;

  function permutationExists(bytes32 permutationID) returns (bool) {
    if(registry[permutationID] == 0) {
      return true;
    } else {
      return false;
    }
  }

  function contractExists(address settlementContract) returns (bool) {
    uint length;
    assembly {
      length := extcodesize(settlementContract)
    }
    if (length > 0) {
      return true;
    } else {
      return false;
    }
  }

  function registerPermutation(bytes32 permutationID, address settlementContract) returns (bool) {
    require(permutationExists(permutationID));
    require(contractExists(settlementContract));
    registry[permutationID] = settlementContract;
    return true;
  }
}
