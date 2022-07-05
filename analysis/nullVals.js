const dotenv = require('dotenv');
dotenv.config();
const { ethers } = require('ethers');
const { GetAndVerify, GetProof, VerifyProof } = require('eth-proof')
const { toBuffer, bufferToHex, keccak256, rlp } = require('ethereumjs-util');
const { SecureTrie: Trie } = require('merkle-patricia-tree');

const Web3 = require("web3");


//const db = new Level('./root/.ethereum/sepolia/geth/chaindata')
const web3 = new Web3("http://127.0.0.1:6545");

// 1391140 Hello Hardhat 0x153a24
//1391155 foobar  0x153a33
//1414904 a very long string   0x1596f8 -> storage[0] = length * 2 + 1

(async () => {

  const nullHash = ethers.utils.keccak256([]);
  console.log(nullHash);
  const nullRlp = ethers.utils.keccak256(rlp.encode(0));
  console.log(nullRlp);
})();
