const { rlp, toBuffer } = require("ethereumjs-util");

const rlpEncodeProof = (proof) => {
  //https://github.com/lidofinance/curve-merkle-oracle/blob/fffd375659358af54a6e8bbf8c3aa44188894c81/offchain/state_proof.py#L45
  const rlpDecodedProofs = proof.map(p => rlp.decode(toBuffer(p)));

  //https://github.com/lidofinance/curve-merkle-oracle/blob/fffd375659358af54a6e8bbf8c3aa44188894c81/offchain/generate_steth_price_proof.py#L61
  const proof_blob = rlp.encode(rlpDecodedProofs);
  return proof_blob;
}

module.exports = {
  rlpEncodeProof
}