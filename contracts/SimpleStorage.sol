// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.8.0;

contract SimpleStorage {
  address public owner;
  uint storedData;

  constructor (address _owner) {
    owner = _owner;
  }

  function set(uint x) public {
    storedData = x;
  }

  function add(uint x) public {
    storedData += x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
