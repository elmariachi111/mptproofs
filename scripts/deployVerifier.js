const hre = require("hardhat");

async function main() {

  const Verifier = await hre.ethers.getContractFactory("ProofVerifier");
  const verifier = await Verifier.deploy();

  await verifier.deployed();

  console.log("Verifier deployed to:", verifier.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
