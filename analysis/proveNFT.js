const dotenv = require('dotenv');
dotenv.config();
const { ethers } = require('ethers');
const { toBuffer, bufferToHex, keccak256, rlp } = require('ethereumjs-util');
const { SecureTrie } = require('merkle-patricia-tree');
const { GetProof } = require('eth-proof');

const Web3 = require("web3");
const { rlpEncodeProof } = require('./libRlp');

//const db = new Level('./root/.ethereum/sepolia/geth/chaindata')
//const web3 = new Web3("http://127.0.0.1:6545");
const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`);

async function validateStorage(proof) {
  const proofBufs = proof.storageProof[0].proof.map(toBuffer);
  const pTrie = await SecureTrie.fromProof(proofBufs);
  const valid = await pTrie.checkRoot(toBuffer(proof.storageHash));
  return valid
}

const getNFTProof = async (blockNumber, contract, slot) => {
  const proof = await web3.eth.getProof(
    contract,
    [slot],
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
  //mainnet
  //prove Mike Tyson
  //Mike Tyson's address is 0x7217BC604476859303A27f111b187526231A300C
  const contract = "0x1a92f7381b9f03921564a437210bb9396471050c"; //cool cats
  const blockNumber = 12790738;

  const block = await web3.eth.getBlock(blockNumber);
  console.log(block);

  //const blockHash = "0x0e7bd33de43c7380dd2e87f5aa51f80ff575c715c72f130b7c020e6d2f72853a"
  const slot = web3.utils.soliditySha3({ type: "uint256", value: 2724 }, { type: "uint256", value: 2 })


  console.log(slot);

  const { proof } = await getNFTProof(blockNumber, contract, slot);
  console.log(proof, proof.storageProof);

  const accountProof = rlpEncodeProof(proof.accountProof);
  const storageProof = rlpEncodeProof(proof.storageProof[0].proof);
  console.log("account: ", bufferToHex(accountProof))
  console.log("storage:", bufferToHex(storageProof));

  console.log(await validateStorage(proof));

})();


  // Splice Price
  // const contract = "0xee25f9e9f3fe1015e1f695ab50bca299aaf4dcf1";
  // const blockNumber = 14828505;
  // const slot = web3.utils.soliditySha3({ type: "uint256", value: 1 }, { type: "uint256", value: 0 })
