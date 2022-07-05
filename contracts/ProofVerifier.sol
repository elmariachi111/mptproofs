// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";
import "./MPT.sol";

contract ProofVerifier {
    function prove(
        bytes32 _storageRoot,
        bytes memory _slotHash,
        bytes[] memory _proof
    ) public view returns (bool) {
        bytes memory x = new bytes(0x0);
        MPT.MerkleProof memory mp = MPT.MerkleProof({
            keyIndex: 0,
            proofIndex: 0,
            expectedValue: x,
            expectedRoot: _storageRoot,
            key: _slotHash,
            proof: _proof
        });
        return MPT.verifyTrieProof(mp);
    }
}
