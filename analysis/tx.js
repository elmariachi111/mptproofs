const { ethers } = require('ethers');
const dotenv = require('dotenv');
dotenv.config();

async function connect() {
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:6545");
  return provider;
}

async function getTx(provider) {

  const txh = "0xb72c538a10b7551c80129e0e9d7eb1f04848c7b1fa425913ff8e893ca6b3f8e0";
  const tx = await provider.getTransaction(txh);
  console.log(tx);
  const receipt = await provider.getTransaction(txh);
  console.log(receipt)
}

(async () => {
  const provider = await connect();
  await getTx(provider);
})();