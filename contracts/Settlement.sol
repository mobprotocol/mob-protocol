pragma solidity ^0.4.11;

import "./Token.sol";

contract Settlement {
  bytes32 public permutationID;
  address public tokenA;
  address public tokenB;

  mapping(bytes32 => uint) public orders;

  function Settlement(bytes32 _permutationID, address _tokenA, address _tokenB) {
    permutationID = _permutationID;
    tokenA = _tokenA;
    tokenB = _tokenB;
  }

  function verifyOrder(address seller, address token, uint quantity, uint price, bytes32 orderHash) returns (bool) {
    bytes32 _msgHash = sha3(seller, token, quantity, price);
    if (orderHash == _msgHash) {
      return  true;
    } else {
      return false;
    }
  }

  function verifySignature(bytes32 msg, uint8 v, bytes32 r, bytes32 s, address seller) internal returns (bool) {
    bytes memory prefix = "\x19Ethereum Signed Message:\n32";
    bytes32 msgHash = sha3(prefix, msg);
    address signer = ecrecover(msgHash, v, r, s);
    if (signer == seller) {
      return true;
    } else {
      return false;
    }
  }

  function verifyAllowance(address token, address seller, uint quantity) internal returns (bool) {
    Token t = Token(token);
    uint approval = t.allowance(seller, this);
    if (approval >= quantity) {
      return true;
    } else {
      return false;
    }
    return true;
  }

  function atomicMatch(
    bytes32[6] order_bytes,
    uint[6] order_ints,
    address[4] order_addresses
  ) returns (bool) {
    /* VERIFYING ORDER 1 */
    require(verifyOrder(order_addresses[0], order_addresses[1], order_ints[0], order_ints[1], order_bytes[0]));
    require(verifySignature(order_bytes[0], uint8(order_ints[2]), order_bytes[1], order_bytes[2], order_addresses[0]));
    require(verifyAllowance(order_addresses[1], order_addresses[0], order_ints[0]));

    /* VERIFYING ORDER 2 */
    require(verifyOrder(order_addresses[2], order_addresses[3], order_ints[3], order_ints[4], order_bytes[3]));
    require(verifySignature(order_bytes[3], uint8(order_ints[5]), order_bytes[4], order_bytes[5], order_addresses[2]));
    require(verifyAllowance(order_addresses[3], order_addresses[2], order_ints[3]));

    /* VERIFY PRICE */
    require(order_ints[1] >= 1 / order_ints[3]);

    /* PERFORM SWAP */
    Token t1 =  Token(order_addresses[1]);
    t1.transferFrom(order_addresses[0], order_addresses[2], order_ints[1]);
    Token t2 = Token(order_addresses[3]);
    t2.transferFrom(order_addresses[2], order_addresses[0], order_ints[4]);
    return true;
  }
}
