pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import "./MPT.sol";

//https://github.com/pipeos-one/goldengate/blob/master/contracts/test/test.js
contract Prover {
    using MPT for MPT.MerkleProof;

    function verifyTrieProof(MPT.MerkleProof memory data)
        public
        view
        returns (bool)
    {
        return data.verifyTrieProof();
    }

    function verifyStorage(MPT.MerkleProof memory storageProof)
        public
        view
        returns (bool valid, string memory reason)
    {
        //EthereumDecoder.Account memory account = EthereumDecoder.toAccount(accountProof.expectedValue);

        //if (account.storageRoot != storageProof.expectedRoot) return (false, "verifyStorage - different trie roots");

        valid = storageProof.verifyTrieProof();

        return (true, "");
    }
}
