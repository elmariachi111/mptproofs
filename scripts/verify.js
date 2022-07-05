require("dotenv").config("../.env");
const { Signer } = require("ethers");
const { ethers } = require("hardhat");

const proof = [
  '0xf90211a078400dd6bd6f6cc13cdde5b707bdb6b9802fbd11809cba8aab2ee72f6920bbf3a0d88879eb6f43ea2d9c07538601e041aa46d64c87df68296a552ad12f8e5bebc0a044d40ac93c1bce308feda36a7712a38d9508087f04e612b1411bc57f80fa77a8a0b92c5fc0dcbc4a7982563c3667b940117770965e5f447578e4bde4fefcbb6d5aa0bc555b313ac90177e117dc10917581dad616770625e0956feb0df75a4be2ce63a0bd19008ae54cf1af36e59d7c92c553693dd468a0ef86c89401d01fc84aa4b751a0ee549b7ab8dd9a565ee6507bb46b9033e57b3a07541a4085763207911633367ca05652bd80f5b970a09c2090c38b13afa1772f3d97422c9a16548acdf629c35113a0a2e78f2d0da2d7218535b94bd69c4fad4425ff3bb22304d722185cf99dac2596a0a9470e771ae9cec5535b057948e68c4c38d8b8c1c2d8ed180d8f5244c63e422ea0726d10a2a5c85b156105414e75591611d896b8aaebd7fc92535845445a8baa81a0fdfb5aa2c35136eab67c3539d3ba34648bb8542b57e745976d52bca263ab19d7a01eafa4a1f59d28009a03b24d9a11c878faa78fe7ef3ecc4ef8891a77fea3fa35a02c980b0a841d5ec1978ae63adf7ba2727ac125f792f545cb0146d8df46adbdbfa052b97e4692fd69b4bebc6ceca258032319b07aca2ee62b504285031670fbc073a02c415e41b6bf838a8b742123fda110703ffdedea8834bb5113ae26f81887668e80',
  '0xf90211a098e0b7071d2b8d890cca479dba9f5b697d639d70d51f0312c5b8a27afc31a23da060759f93f482f66b233480a4cd060372567752b9dae507045b266600ab9b290da0c35bb5b2aae7eb8bc75a9de125daab9caa7d6d39e403153c9b34e51dcde46f78a097a4c1ba8ac42378481754eac9306b62d3d176602098820cb87e3c7f4091734da074b2785ca9199d0c68e2fa6dd01dcc24791887616adf8043cda56651cff25e87a00937963d57bc119144ebeff9bb99dcbef11aed563fd41818aaf0de89d15364b3a000ba5def8acd7c1c2af85ef49bc5d144fa1ceef93e81e9e64ad6457ab92cb569a069cd4b3ac6b03b1928f50840f81086ff0c819d1cbd445db0e5c306cfce9c0728a0a78339d0b9405da5a7943a6ac97b9585767a6f9f0e481b5e197d8fd820ac1cfaa019e1319ade8f1c2254dcef0b68483240044bc6bee2ea8197de895eb427068b1aa0ef36884df92b5769e521c6c0feaead503a8d70d11f493b3e6c8170ac917ced92a079c1ffdaa2a8d4ddacac77f47b43f1553c634300d23a8003574ec90874547cbaa0de4f130f1fd52baf5229e3871394b6f0562c64576039c6c38d06c695b7d87b07a09668798efa8c1e9b860d9f4a49b65db83c22fefd92f703a5875b87c7ae11bdf4a087ca8f145dbc9ad7f88468dbec0627d77ced63a508b4d7a5d28439e89c6be8e4a04fdb75be4fce4d76e41578f0bbcfdc2ded74d59855c9f3afc73c3659b9e28aa980',
  '0xf90211a058d99773cf489bd86bac2c6452c20cc7056f3505d7f96d83480cf85336d0da85a07dc4216585f73a213fb1828076cf7d93d8ce95e1981a5c8eb11d7166af8433eba0f85f31a95a1f83516719ae596266afdc529aa4ff9af8f0f6c1d7da6751f07d70a0f1371490b8ef31ce814673e9ecf0f498f2ec9eedcd554e93162d5c0e99e77d69a01d9709211cc089eba15fe3c052539203d11235b219e1c72e0172c9bec1d317bea09e907ad084233149719b5c6f8b4777a617b41744a0c3e9f6ef002970465a0656a044f3abc34546455ba2ed3d64ead41c734d5f56c240f8f8adfd971179538ca0efa08403716832691c8867b1366421b703925ff28e45d6f4360f898b70461e29d4eda0d8f4711ffe7bc79040b2f397523786a67d72814e8af9b65c9e03c318bb0eba48a0db84d2a268e67d6e45af7cd18a92fab1df496180e9ba8f0f0b620ab6344457cba0d01707094316206d689d80ed2684cda3aadd72ee2d4efbe1437bb194aa0adc87a0355e0e203341ac995bf2d90937f1ce807a13624e9d3831476f3205838b84f191a083961a9b498b791ee8e6a110a87aca2f2cea629df0827f4fbd168567d7246207a05d312338764151dc1936485637367ad9d9c440b4b0dde368dec4dbd5aaf51f4ea076b77567690221701e2edfff06f1c84a25b3181e4c8aa3bed2b3e3797a883564a0975b63f1be5615a4a68ec7f313abc0784def11a352975c40e886e03df95f764e80',
  '0xf9013180a0944968a4a8c7ba1e91cbb2414471a67f16c74e2ef6ac87447af0402520aed9c88080a03f3e1fed1008e242b89ce5b56106a091f946826c539f23ecee74c5b36b5d38cca041b58c41b5435e10c9b9f6b1f1bdf3d5e0294dfcfbf59b7a8c80475249e1d9e6a0d0b42862dcb175e47bf17614bd251b17cdab2710ba13175fd9b8c17afdc0893ba0ff4dc7ee613a7805802e50d39c3c8d8b35db63ceda7371502c5d119eca0a7b1780a0cd328766d44f930edc3a32ae5fd2a791f0de4dbabe014c4be77fc63b4b427310a0c20a6a1812f18d0c446408f90b09d0b592a07c45d06e780b49c6ad68e7c92bc5a084688c931305a75246f9d527a07483cff6e9ffbe4746a22ca65e07d3b3c6045f8080a0515f82b6e34b4713edead2652f266fdcea3729d64217113db564e918a9b1ed408080',
  '0xf8518080a06b91f274ef06ab455966416f6bb3779519bf72c68e85ec4b61ff8b99aa73a1818080a0937ee4540dc495eaa3cd61e12a4f6158a6be147d71ac3955a50ecd080e9732698080808080808080808080',
  '0xf8709e3e0484bbc22108bc77412e65255ce0387dc7c6a8d1917625ddb60ccbd98fb84ff84d028901f3d52b3c4f92e45da056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a0c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
]

const stateRootHash = "0xb159ecc463dbee96f50fcf7d1e3d2b23315271512762bafcecdfd1924dc8cea7";
async function main() {

  const Verifier = await ethers.getContractFactory("ProofVerifier");
  const verifier = Verifier.attach(process.env.CONTRACT_VERIFIER);

  //console.log("Verifier deployed to:", verifier.address);

  const result = await verifier.extractAccountFromProof("0xe127a39da6ea2d7b1979372ae973a20bab08a80a", stateRootHash, proof);

  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });