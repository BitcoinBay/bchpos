import axios from 'axios';

let BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
let BITBOX;

async function initBITBOX() {
  if (!BITBOX) {
    BITBOX = new BITBOXCli();
  }
}

export function getBIP21URL(pubkey, payAmount, payLabel) {
  initBITBOX();
  let bip21options = {
    amount: payAmount,                  //Value in BTC decimals
    label: payLabel
  };
  let bip21url = BITBOX.BitcoinCash.encodeBIP21(pubkey, bip21options);
  return bip21url;
}

// hard coded xpub index to "5"
export function generateNewAddress(xpubkey, index) {
  initBITBOX();
  let newAddress = BITBOX.Address.fromXPub(xpubkey, `0/${index}`);
//  console.log(newAddress);
  return newAddress;
}
