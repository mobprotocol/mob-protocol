# Mob Protocol

## Summary
This is a more general abstraction to the 0x protocol that allows for an incentivized `Matching Agent Swarm` to form around `ERC20` token permutations. The notation of maker-taker orders are abstracted away in favor of a single `Limit Order` definition.

## Limit Order
```
{
  id: PERMUTATION_HASH
  sellAddress: TOKEN_ADDRESS,
  sellPrice: '0.00000000',
  filled: 0,
  lifetime: UNIX_TIMESTAMP
  signature: '',
}
```

### Permutation Hash
The permutation hash is derived from the address of the token pair it points to.

Given `tokenAddressA` and `tokenAddressB`,
1. Compute an alphanumeric sort on the token pair. This is a replicable calculation on the cipher text to ensure the token pair is always hashed in the same order.

2. Given the alphanumeric ordering, concatenate the the public address strings as 'tokenAddress1' + 'tokenAddress2'

3. Take the sha256() of the concatenated string, the result is a unique 256 bit hex string identification for the token permutation.

### Sell Address
The orderer specifies the public address of the erc20 token contract they are selling. The buying address is inferred by the permutation id. The contract will check the approval mapping in the specified ERC20 contract to ensure the approval has already been mined.

### Sell Price
Sell Price is specified by bytes32 representation of the minimum accepted price.

## Order Signing R-S-V
A user initiates an order by performing an ECDSA signature with there private key on the stringified json object. Given the users private key and the order object, an `r` `s` `v` output is appended to the order object.
