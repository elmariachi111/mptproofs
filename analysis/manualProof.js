const dotenv = require('dotenv');
dotenv.config();

const { Level } = require('level')
const { ethers } = require('ethers');
const { SecureTrie } = require('merkle-patricia-tree');
const { toBuffer, bufferToHex, keccak256, rlp, Account, Address } = require('ethereumjs-util');
const Web3 = require("web3");
const { nibblesToBuffer } = require('merkle-patricia-tree/dist/util/nibbles');
const { decodeNode } = require('merkle-patricia-tree/dist/trieNode');
const db = new Level('./root/.ethereum/sepolia/geth/chaindata')
const web3 = new Web3("http://127.0.0.1:6545");

/*
And as usual, the answer is far closer when you ask your question publicly first. The proof actually contains the leaf node with the value you want to prove as its last stack entry. Here's a sample for the Sepolia network:

If I want you to prove the balance of my account `0xe127a39da6ea2d7b1979372ae973a20bab08a80a` at block height `1432400` to you, I can provide you this stack of MPT nodes (you can use `eth_getProof` for that):

*/

/* or
  const { node: accNode } = await proofTrie.findPath(keccak256(toBuffer(address)));
  const accNode = decodeNode(proofBufs[proofBufs.length - 1]);
*/
async function verifyAccount(address, accountProof, stateRoot) {

  const proofBufs = accountProof.map(p => toBuffer(p));
  const proofTrie = await SecureTrie.fromProof(proofBufs);
  const accNodeRaw = await proofTrie.get(keccak256(toBuffer(address)));
  const account = Account.fromRlpSerializedAccount(accNodeRaw);

  console.log("proven value", account);
  //const valid = await proofTrie.checkRoot(toBuffer(stateRoot));
  const valid = bufferToHex(proofTrie.root) == stateRoot;
  return valid;
}

async function getState(address, blockNumber) {

  const block = await web3.eth.getBlock(blockNumber);
  //console.log(block);

  const trie = new SecureTrie(db, toBuffer(block.stateRoot));

  const rawValue = await trie.get(toBuffer(address));
  console.log("rawValue", rawValue);

  const { node: accNode, stack } = await trie.findPath(keccak256(toBuffer(address)));

  console.log("accNode", accNode);

  const account = Account.fromRlpSerializedAccount(rawValue);
  console.log("account", account);

  const balance = ethers.utils.hexZeroPad(bufferToHex(account.balance), 32);
  console.log("account", account.isContract(), ethers.utils.formatEther(balance), bufferToHex(account.stateRoot));

  //https://github.com/ethereumjs/ethereumjs-monorepo/blob/cfd7b7754490b072a035cceaba59c3dfb517effd/packages/client/lib/rpc/modules/eth.ts#L956
  //https://github.com/ethereumjs/ethereumjs-monorepo/blob/cfd7b7754490b072a035cceaba59c3dfb517effd/packages/statemanager/src/stateManager.ts#L319
  //https://github.com/ethereumjs/ethereumjs-monorepo/blob/cfd7b7754490b072a035cceaba59c3dfb517effd/packages/trie/src/trie/trie.ts#L636

  const stackProof = stack.map((stackElem) => {
    return stackElem.serialize()
  })

  const trieProof = await SecureTrie.createProof(trie, toBuffer(address));

  const web3Proof = await web3.eth.getProof(
    address,
    [0],
    blockNumber
  );

  console.log("findPath", stackProof.map(bufferToHex));
  console.log("createProof", trieProof.map(bufferToHex));
  console.log("web3proof", web3Proof.accountProof)

  return [block, stackProof];
}

async function walkTrie(blockNumber) {
  const block = await web3.eth.getBlock(blockNumber);
  const trie = new SecureTrie(db, toBuffer(block.stateRoot));

  await trie.walkTrie(toBuffer(block.stateRoot), (nodeRefBuffer, treeNode, keyNibbles, walkController) => {
    console.log(treeNode);
  });
}

(async () => {
  //await walkTrie("1432480");
  await db.open();
  const [block, accountProof] = await getState("0xe127a39da6ea2d7b1979372ae973a20bab08a80a", 1432400); //1432400 //1415722 old / lower balance
  console.log(block);
  const isValid = await verifyAccount("0xe127a39da6ea2d7b1979372ae973a20bab08a80a", accountProof, block.stateRoot);
  console.log("proof is valid", isValid);
})();