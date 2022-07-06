const dotenv = require('dotenv');
dotenv.config();
const { ethers } = require('ethers');
const { GetAndVerify, GetProof, VerifyProof } = require('eth-proof')
const { toBuffer, bufferToHex, keccak256, rlp } = require('ethereumjs-util');
const { SecureTrie } = require('merkle-patricia-tree');

const Web3 = require("web3");
const { rlpEncodeProof } = require('./libRlp');


//const db = new Level('./root/.ethereum/sepolia/geth/chaindata')
const web3 = new Web3("http://127.0.0.1:6545");

async function getProof(blockNumber) {
  const block = await web3.eth.getBlock(blockNumber);
  const proof = await web3.eth.getProof(
    process.env.CONTRACT_GREETER,
    [0],
    blockNumber
  );

  return { block, proof };
}
async function validateAccount(proof, stateRoot) {
  const proofBufs = proof.accountProof.map(p => toBuffer(p));
  const pTrie = await SecureTrie.fromProof(proofBufs);
  const valid = bufferToHex(pTrie.root) == stateRoot;
  //const valid = await pTrie.checkRoot(toBuffer(stateRoot));
  return valid;
}

async function validateStorage(proof) {
  const proofBufs = proof.storageProof[0].proof.map(p => toBuffer(p));
  const pTrie = await SecureTrie.fromProof(proofBufs);
  const valid = await pTrie.checkRoot(toBuffer(proof.storageHash));
  return valid
}

//1391140 Hello Hardhat 0x153a24
//1391155 foobar  0x153a33
//1414904 a very long string   0x1596f8 -> storage[0] = length * 2 + 1

async function getLongString() {
  const blockNumber = 1414904;
  const { block, proof } = await getProof(blockNumber);

  console.log(proof, proof.storageProof);
  const isStorageValid = await validateStorage(proof);
  console.log(isStorageValid);

  const isAccountValid = await validateAccount(proof, block.stateRoot);
  console.log(isAccountValid);

  const storage = await web3.eth.getStorageAt(process.env.CONTRACT_GREETER, 0, blockNumber)
  const slotLen = ethers.BigNumber.from(storage).toNumber();
  const byteLen = (slotLen - 1) / 2
  console.log(byteLen);
  const p1 = web3.utils.soliditySha3(0);

  const s1 = await web3.eth.getStorageAt(process.env.CONTRACT_GREETER, p1, blockNumber)

  const p2 = ethers.BigNumber.from(p1).add(1);
  const s2 = await web3.eth.getStorageAt(process.env.CONTRACT_GREETER, p2.toHexString(), blockNumber)

  const p3 = p2.add(1);
  const s3 = await web3.eth.getStorageAt(process.env.CONTRACT_GREETER, p3.toHexString(), blockNumber)

  const p4 = p3.add(1);
  const s4 = await web3.eth.getStorageAt(process.env.CONTRACT_GREETER, p4.toHexString(), blockNumber)

  const p5 = p4.add(1);
  const s5 = await web3.eth.getStorageAt(process.env.CONTRACT_GREETER, p5.toHexString(), blockNumber)

  const p6 = p5.add(1);
  const s6 = await web3.eth.getStorageAt(process.env.CONTRACT_GREETER, p6.toHexString(), blockNumber)

  const p7 = p6.add(1);
  const s7 = await web3.eth.getStorageAt(process.env.CONTRACT_GREETER, p7.toHexString(), blockNumber)

  const p8 = p7.add(1);
  const s8 = await web3.eth.getStorageAt(process.env.CONTRACT_GREETER, p8.toHexString(), blockNumber)

  console.log(p1, s1, web3.utils.hexToAscii(s1));
  console.log(p2.toHexString(), s2, web3.utils.hexToAscii(s2));
  console.log(p3.toHexString(), s3, web3.utils.hexToAscii(s3));
  console.log(p4.toHexString(), s4, web3.utils.hexToAscii(s4));
  console.log(p5.toHexString(), s5, web3.utils.hexToAscii(s5));
  console.log(p6.toHexString(), s6, web3.utils.hexToAscii(s6));
  console.log(p7.toHexString(), s7, web3.utils.hexToAscii(s7));
  console.log(p8.toHexString(), s8, web3.utils.hexToAscii(s8));
}

const proveLongString = async (blockNumber) => {
  const p1 = web3.utils.soliditySha3(0);
  const proof = await web3.eth.getProof(
    process.env.CONTRACT_GREETER,
    [0, p1, 2], //the wanted storage slot
    blockNumber
  );
  console.log(proof.storageProof);
  const slotLen = ethers.BigNumber.from(proof.storageProof[0].value).toNumber();
  const byteLen = (slotLen - 1) / 2
  console.log(byteLen);

}

const getGreeterProof = async (blockNumber) => {
  const proof = await web3.eth.getProof(
    process.env.CONTRACT_GREETER,
    [0], //the wanted storage slot
    blockNumber
  );

  const value = web3.utils.hexToAscii(proof.storageProof[0].value);
  console.log(value);

  const proofBufs = proof.storageProof[0].proof.map(toBuffer);
  const proofTrie = await SecureTrie.fromProof(proofBufs);
  //const valid = await pTrie.checkRoot(toBuffer(proof.storageHash));
  const valid = bufferToHex(proofTrie.root) == proof.storageHash;
  console.log(valid)

  return { proof }
}

(async () => {
  const slot = web3.utils.soliditySha3({ type: "uint256", value: 0 })
  console.log(slot);

  const blockNumber = 1391140;
  //const { proof } = await getProof(blockNumber);
  const block = await web3.eth.getBlock(blockNumber);
  console.log(block);
  const { proof } = await getGreeterProof(blockNumber);
  console.log(proof, proof.storageProof);

  const accountProof = rlpEncodeProof(proof.accountProof);
  const storageProof = rlpEncodeProof(proof.storageProof[0].proof);
  console.log("account: ", bufferToHex(accountProof))
  console.log("storage:", bufferToHex(storageProof));

  //await proveLongString(1414904);
})();
