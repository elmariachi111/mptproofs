require("dotenv").config("../.env");
const { Signer } = require("ethers");
const { ethers } = require("hardhat");

const proof = [
  '0xf8f1a0a5038f838afe99e64d85195eb0fa58ddb28de182da50fcf3c009dd3dc8c64cb0a06457654a8ce73d8b27853ae7470873c32ff6688d83f3e159476b1349c4a5bff880a03ca9672c347a52f2698768df27b3214eb3f2f50ace93b248017ed50a7a424afd80808080a0061eb04f02d87c97286604951059e43120fc0e43dd3130a879df7d2b354b9d6a80a0e5b82c2eb109922d07fd3680824e916daf218a0e5c7d345494bffef6e65f10d1a056f471aec8c840bcccd05ee7898b7fe8cca0013b5ce74106667ada2e23d790768080a0e26c71c0235f35ebe83d0cab8dca3c2ae4ee012e4b3bfe9e2bea5489d53973898080',
  '0xeaa03f9553dc324cd1fd24b54243720c42e18e5c20165bc5e523e42b440a8654abd18887f8b0a10e470000'
]

const slot = "0xada5013122d395ba3c54772283fb069b10426056ef8ca54750cb9bb552a59e7d";
const storageHash = "0x7d8ccfe8557aa8d5590d385d590dd4822540fd325ef2d0987d345fb1bcef1613";
async function main() {

  const Verifier = await ethers.getContractFactory("ProofVerifier");
  const verifier = Verifier.attach(process.env.CONTRACT_VERIFIER);

  const result = await verifier.extractSlotValueFromProof(
    slot,
    storageHash,
    proof
  );

  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
