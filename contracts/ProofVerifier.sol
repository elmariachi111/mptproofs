// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "./StateProofVerifier.sol";
import {RLPReader} from "solidity-rlp/contracts/RLPReader.sol";

contract ProofVerifier {
    using RLPReader for RLPReader.RLPItem;
    using StateProofVerifier for StateProofVerifier.Account;

    function extractAccountFromProof(
        address _address,
        bytes32 _stateRootHash,
        bytes[] memory _proof
    ) public pure returns (StateProofVerifier.Account memory account) {
        bytes32 addressHash = keccak256(abi.encodePacked(_address));
        RLPReader.RLPItem[] memory rlpProof = new RLPReader.RLPItem[](
            _proof.length
        );
        for (uint256 i = 0; i < _proof.length; i++) {
            rlpProof[i] = RLPReader.toRlpItem(_proof[i]);
        }

        account = StateProofVerifier.extractAccountFromProof(
            addressHash,
            _stateRootHash,
            rlpProof
        );
    }

    function extractSlotValueFromProof(
        bytes32 _slotHash,
        bytes32 _storageRootHash,
        bytes[] memory _proof
    ) public pure returns (StateProofVerifier.SlotValue memory slotValue) {
        RLPReader.RLPItem[] memory rlpProof = new RLPReader.RLPItem[](
            _proof.length
        );
        for (uint256 i = 0; i < _proof.length; i++) {
            rlpProof[i] = RLPReader.toRlpItem(_proof[i]);
        }

        slotValue = StateProofVerifier.extractSlotValueFromProof(
            _slotHash,
            _storageRootHash,
            rlpProof
        );
    }
}
