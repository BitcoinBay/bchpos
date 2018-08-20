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

export function generateNewAddress(xpubkey) {
  initBITBOX();
  let newAddress;
  let pendingAddress = true;

  while (pendingAddress) {
    let i = 0;
    newAddress = BITBOX.Address.fromXPub(xpubkey, `0/${i}`);
    axios.get(`https://rest.bitcoin.com/v1/address/details/${newAddress}`)
      .then(res => {
        const data = res.data.totalReceivedSat;
        console.log(data);
        pendingAddress = (data == 0) ? false : true;
        /*
        if (data == 0) {
          console.log(data);
          pendingAddress = true;
        }
        else {
          console.log(newAddress);
          i++;
        }
        */
      })
    i++;
  }

  return newAddress;
}
