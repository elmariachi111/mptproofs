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
        bytes memory _proofRlpBytes
    ) public view returns (StateProofVerifier.Account memory account) {
        RLPReader.RLPItem[] memory proofs = _proofRlpBytes.toRlpItem().toList();
        console.log("RLP Item length %d", proofs.length);

        bytes32 addressHash = keccak256(abi.encodePacked(_address));

        account = StateProofVerifier.extractAccountFromProof(
            addressHash,
            _stateRootHash,
            proofs
        );
    }

    function extractSlotValueFromProof(
        bytes32 _slotHash,
        bytes32 _storageRootHash,
        bytes memory _proofRlpBytes
    ) public view returns (StateProofVerifier.SlotValue memory slotValue) {
        RLPReader.RLPItem[] memory proofs = _proofRlpBytes.toRlpItem().toList();
        //console.log("RLP Item length %d", proofs.length);
        slotValue = StateProofVerifier.extractSlotValueFromProof(
            _slotHash,
            _storageRootHash,
            proofs
        );
    }

    // function proveContractValue(

    // )
}
