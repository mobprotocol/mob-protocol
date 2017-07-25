pragma solidity ^0.4.11;

import "./Token.sol";

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

  function getMsgHash(address seller, address token, uint quantity, uint price) returns (bytes32) {
    return sha3(seller, token, quantity, price);
  }

  function verifyOrder(address seller, address token, uint quantity, uint price, bytes32 orderHash) returns (bool) {
    bytes32 msgHash = sha3(seller, token, quantity, price);
    if (orderHash == msgHash) {
      return true;
    } else {
      return false;
    }
  }

  function verifySignature(bytes32 msg, uint8 v, bytes32 r, bytes32 s, address seller) returns (bool) {
    bytes memory prefix = "\x19Ethereum Signed Message:\n32";
    bytes32 msgHash = sha3(prefix, msg);
    address signer = ecrecover(msgHash, v, r, s);
    if (signer == seller) {
      return true;
    } else {
      return false;
    }
  }

  function verifyAllowance(address token, address seller, uint quantity) returns (bool) {
    Token t = Token(token);
    uint approval = t.allowance(seller, this);
    if (approval >= quantity) {
      return true;
    } else {
      return false;
    }
  }

  function atomicMatch(
    bytes32 orderHash1,
    address seller1,
    address token1,
    uint quantity1,
    uint price1,
    uint8 v1,
    bytes32 r1,
    bytes32 s1,
    address seller2,
    uint send1,
    uint send2
  ) returns (bool) {
    require(verifyOrder(seller1, token1, quantity1, price1, orderHash1));
    require(verifySignature(orderHash1, v1, r1, s1, seller1));
    require(verifyAllowance(token1, seller1, quantity1));
    require(send1 <= quantity1);

    Token t1 = Token(token1);
    t1.transferFrom(seller1, seller2, send1);
    return true;
  }
}
