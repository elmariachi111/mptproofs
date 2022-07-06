const hre = require("hardhat");

async function main() {

  const Prover = await hre.ethers.getContractFactory("Prover");
  const prover = await Prover.deploy();

  await prover.deployed();

  console.log("Prover deployed to:", prover.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
