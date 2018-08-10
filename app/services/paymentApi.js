import QRCode from 'qrcode-react';

let BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
let BITBOX;

function initBITBOX() {
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
