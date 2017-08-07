pragma solidity ^0.4.11;

contract Registry {

  mapping(bytes32 => address) public registry;

  function permutationAvailable(bytes32 permutationID) internal returns (bool) {
    if(registry[permutationID] == 0) {
      return true;
    } else {
      return false;
    }
  }

  function contractExists(address adrs) internal returns (bool) {
    uint length;
    assembly {
      length := extcodesize(adrs)
    }
    if (length > 0) {
      return true;
    } else {
      return false;
    }
  }

  function registerPermutation(bytes32 permutationID, address settlementContract) returns (bool) {
    require(permutationAvailable(permutationID));
    require(contractExists(settlementContract));
    registry[permutationID] = settlementContract;
    return true;
  }
}
