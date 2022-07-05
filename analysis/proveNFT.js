const dotenv = require('dotenv');
dotenv.config();
const { ethers } = require('ethers');
const { toBuffer, bufferToHex, keccak256, rlp } = require('ethereumjs-util');
const { SecureTrie } = require('merkle-patricia-tree');

const Web3 = require("web3");

//const db = new Level('./root/.ethereum/sepolia/geth/chaindata')
//const web3 = new Web3("http://127.0.0.1:6545");
const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`);

async function validateStorage(proof) {
  const proofBufs = proof.storageProof[0].proof.map(toBuffer);
  const pTrie = await SecureTrie.fromProof(proofBufs);
  const valid = await pTrie.checkRoot(toBuffer(proof.storageHash));
  return valid
}


(async () => {
  //mainnet

  //prove Mike Tyson
  //const CoolCatsContract = "0x1a92f7381b9f03921564a437210bb9396471050c";
  //const blockNumber = 12790738;
  //const slot = web3.utils.soliditySha3({ type: "uint256", value: 2724 }, { type: "uint256", value: 2 })

  const contract = "0xee25f9e9f3fe1015e1f695ab50bca299aaf4dcf1";
  const blockNumber = 14828505;
  const slot = web3.utils.soliditySha3({ type: "uint256", value: 1 }, { type: "uint256", value: 0 })
  console.log(slot);

  const proof = await web3.eth.getProof(
    contract,
    [slot],
    blockNumber
  );

  console.log(proof, proof.storageProof);

  console.log(await validateStorage(proof));

})();
