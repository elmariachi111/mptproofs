const { ethers } = require('ethers');
const dotenv = require('dotenv');
dotenv.config();

async function connect() {
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:6545");
  const block = await provider.getBlock(1383144);
  return provider;
}

async function send(provider) {
  const _wallet = new ethers.Wallet(process.env.PK);
  const wallet = _wallet.connect(provider);

  const txRequest = await wallet.populateTransaction({
    from: wallet.address,
    to: process.env.TO,
    value: ethers.utils.parseEther("0.001")
  })
  const result = await wallet.sendTransaction(txRequest);

  console.log(txRequest, result);
  const receipt = await result.wait();
  console.log("Receipt", receipt);
}

(async () => {
  const provider = await connect();
  await send(provider);
})();