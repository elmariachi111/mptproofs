const { ethers } = require('ethers');
const dotenv = require('dotenv');
const fs = require('node:fs');
const Web3 = require("web3");

dotenv.config({ path: "../.env" });

async function connect() {
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:6545");

  return provider;
}

async function withdraw(provider) {

  const json = await fs.promises.readFile(".miner", { encoding: "utf-8" });
  //const wallet = provider.eth.accounts.wallet.decrypt([JSON.parse(json)], process.env.PW);
  const _wallet = await ethers.Wallet.fromEncryptedJson(json, process.env.PW);
  const wallet = _wallet.connect(provider);

  const txRequest = await wallet.populateTransaction({
    from: wallet.address,
    to: process.env.TO,
    value: ethers.utils.parseEther("14")
  })
  const result = await wallet.sendTransaction(txRequest);

  console.log(txRequest, result);
  const receipt = await result.wait();
  console.log("Receipt", receipt);
}

(async () => {
  const provider = await connect();
  await withdraw(provider);
})();