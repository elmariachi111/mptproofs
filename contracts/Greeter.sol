//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Greeter {
    string private greeting;
    bytes32[2] private someStorage;

    constructor(string memory _greeting) {
        greeting = _greeting;
        someStorage[0] = keccak256(abi.encode(_greeting));
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        someStorage[1] = someStorage[0];
        someStorage[0] = keccak256(abi.encode(_greeting));
        greeting = _greeting;
    }
}
