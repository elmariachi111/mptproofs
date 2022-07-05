require("dotenv").config("../.env");
const { Signer } = require("ethers");
const { ethers } = require("hardhat");

const proof = [
  '0xf8518080a0e2a22c03c4f21673563d55cbad16de4c4affc9a54c3eea063ce358ccd6d02c4c8080808080808080a0fc47ec7aea920817d850c758a8fd61ecc89b967b2fe8d9ec6d00feedeb0a7d658080808080',
  '0xf843a0390decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563a1a048656c6c6f2c204861726468617421000000000000000000000000000000001e'
]

const slot = "0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563";
const storageHash = "0x4c0cad4696e5b0ca33f7757d9dfa601a07e65f3ff49da21a03f9cb1fb6fd9218";
async function main() {

  const Verifier = await ethers.getContractFactory("ProofVerifier");
  const verifier = Verifier.attach(process.env.CONTRACT_VERIFIER);

  const result = await verifier.extractSlotValueFromProof(
    slot,
    storageHash,
    proof
  );

  const valAsHex = result.value.toHexString();
  console.log(ethers.utils.toUtf8String(valAsHex));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
