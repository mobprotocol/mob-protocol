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

  function broadcast(bytes32 order, uint sellAmount, bytes32 price) returns (bool) {
    orderBroadcast(msg.sender, order, sellAmount, price);
    orders[msg.sender][order] = sellAmount;
    return true;
  }

  function verifySignature(bytes32[2] signature, uint8 v, address seller, bytes32 msg) returns (bool) {
    bytes memory prefix = "\x19Ethereum Signed Message:\n32";
    bytes32 msgHash = sha3(prefix, msg);
    address signer = ecrecover(msgHash, v, signature[0], signature[1]);
    if (signer == seller) {
      return true;
    } else {
      return false;
    }
  }
}
