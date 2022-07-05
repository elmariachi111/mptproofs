// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;
import "hardhat/console.sol";
import "./StateProofVerifier.sol";
import {RLPReader} from "solidity-rlp/contracts/RLPReader.sol";

contract ProofVerifier {
    using RLPReader for bytes;
    using RLPReader for RLPReader.RLPItem;
    using StateProofVerifier for StateProofVerifier.Account;

    function extractAccountFromProof(
        address _address,
        bytes32 _stateRootHash,
        bytes[] memory _proof
    ) public view returns (StateProofVerifier.Account memory account) {
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
        bytes memory _proofRlpBytes
    ) public view returns (StateProofVerifier.SlotValue memory slotValue) {
        RLPReader.RLPItem[] memory proofs = _proofRlpBytes.toRlpItem().toList();
        console.log("RLP Item length %d", proofs.length);
        require(proofs.length == 7);
        //RLPReader.RLPItem[] memory rlpProof = new RLPReader.RLPItem[](
        //     _proof.length
        // );
        // for (uint256 i = 0; i < _proof.length; i++) {
        //     rlpProof[i] = RLPReader.toRlpItem(_proof[i]);
        // }

        slotValue = StateProofVerifier.extractSlotValueFromProof(
            _slotHash,
            _storageRootHash,
            proofs // [0] //.toList()
        );
    }
}
