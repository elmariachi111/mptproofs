const { Level } = require('level')
const { ethers } = require('ethers');
const { SecureTrie } = require('merkle-patricia-tree');
const { toBuffer, bufferToHex, keccak256, rlp } = require('ethereumjs-util');
const Account = require('ethereumjs-account').default;
const Web3 = require("web3");
const db = new Level('./root/.ethereum/sepolia/geth/chaindata')
const web3 = new Web3("http://127.0.0.1:6545");

async function web3Proof(address) {
  const w3proof = await web3.eth.getProof(address, [0], 1394045);
  console.log(JSON.stringify(w3proof, null, 2));
}

async function slot0Proof(address) {

}
//https://github.com/ethereum/EIPs/issues/1186#issuecomment-443990746

async function getContractState(address, stateRoot) {
  const trie = new SecureTrie(db, stateRoot);

  const key0 = toBuffer(ethers.utils.hexZeroPad(0, 32));
  const value0 = bufferToHex(rlp.decode(await trie.get(key0)));
  //const dec0 = ethers.utils.defaultAbiCoder.decode(["string"], value0);

  console.log("slot0", value0);
  const stream = trie.createReadStream();

  stream.on('data', function ({ key, value }) {
    console.log(`key: ${bufferToHex(key)}`)
    console.log(`value: ${bufferToHex(rlp.decode(value))}`)
  }).on('end', () => {
    console.log('Finished reading storage.')
  });

  //57687920776f756c6420796f7520736574207468697320746f2061206c61726765206e756d6265723f21
}

async function run() {
  await db.open();
  const stateRoot = "0xb0c84a3eb4262c0667661b579b1cbae4ad615e9983b8adb7c1d954e042254bb0";
  const trie = new SecureTrie(db, toBuffer(stateRoot));

  const address = "0xF492600AeD292b1B94A1ba0CD29fB6ed6d6ab872";
  const buf = toBuffer(address)
  const raw = await trie.get(buf);

  const account = new Account(raw);
  const balance = ethers.utils.hexZeroPad(bufferToHex(account.balance), 32);
  console.log("account", account.isContract(), ethers.BigNumber.from(balance).toString(), bufferToHex(account.stateRoot));
  await getContractState(address, account.stateRoot);

  //  await getProof(address);
}

(async () => {
  //  await run();
  const nodeInfo = await web3.eth.getNodeInfo();
  console.log(nodeInfo);
})()