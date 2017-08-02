pragma solidity ^0.4.11;

contract Token {
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    mapping( address => uint ) balances;
    mapping( address => mapping( address => uint ) ) approvals;

    string public name;
    string public ticker;
    uint public supply;

    function Token(string _name, string _ticker, uint _supply) {
        name = _name;
        ticker = _ticker;
        supply = _supply;
        balances[msg.sender] = _supply;
    }

    function transfer(address to, uint value) returns (bool) {
        require(balances[msg.sender] >= value);
        balances[msg.sender] -= value;
        balances[to] += value;
        Transfer( msg.sender, to, value );
        return true;
    }

    function transferFrom(address from, address to, uint value) returns (bool) {
      require(balances[from] >= value);
      require(approvals[from][msg.sender] >= value);

      approvals[from][msg.sender] -= value;
      balances[from] -= value;
      balances[to] += value;
      Transfer(from, to, value);
      return true;
    }

    function approve( address spender, uint value ) returns (bool) {
        require(balances[msg.sender] >= value);
        approvals[msg.sender][spender] = value;
        Approval(msg.sender, spender, value);
        return true;
    }

    function allowance(address owner, address spender) constant returns (uint) {
        return approvals[owner][spender];
    }

    function balanceOf(address who) constant returns (uint) {
        return balances[who];
    }
}
