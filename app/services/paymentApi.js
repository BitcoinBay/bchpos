import axios from 'axios';

let BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
let BITBOX;

async function initBITBOX() {
  if (!BITBOX) {
    BITBOX = new BITBOXCli();
  }
}

// payAmount is denominated in 1 BTC (BCH) base value
export function getBIP21URL(pubkey, payAmount, payLabel) {
  initBITBOX();
  let bip21options = {
    amount: payAmount,                  //Value in BTC decimals
    label: payLabel
  };
  let bip21url = BITBOX.BitcoinCash.encodeBIP21(pubkey, bip21options);
  return bip21url;
}

/*
m / purpose' / coin_type' / account' / change / address_index

1. derive the first account's node (index = 0)
2. derive the external chain node of this account
3. scan addresses of the external chain; respect the gap limit described below
4. if no transactions are found on the external chain, stop discovery
5. if there are some transactions, increase the account index and go to step 1
*/

export function generateNewAddress(xpubkey, index) {
  initBITBOX();
  let newAddress = BITBOX.Address.fromXPub(xpubkey, `0/${index}`);
//  console.log(newAddress);
  return newAddress;
}
