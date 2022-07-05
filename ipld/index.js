const { convert: formatToCodec } = require('ipld-format-to-blockcodec')
const Block = require('multiformats/block')
//const codec = require('@ipld/dag-json')
const { keccak256: hasher } = require('@multiformats/sha3');
const ipldEth = require('ipld-ethereum')

const codec = formatToCodec(ipldEth.ethBlock);

(async () => {
  const value = { hello: 'world' }

  // encode a block
  let block = await Block.encode({ value, codec, hasher })

  block.value // { hello: 'world' }
  block.bytes // Uint8Array
  block.cid   // CID() w/ sha2-256 hash address and dag-cbor codec

  // you can also decode blocks from their binary state
  block = await Block.decode({ bytes: block.bytes, codec, hasher })
  console.log(block)

  // if you have the cid you can also verify the hash on decode
  block = await Block.create({ bytes: block.bytes, cid: block.cid, codec, hasher })

})();

