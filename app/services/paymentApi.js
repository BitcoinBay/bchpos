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
  let emptyAddress = false;

  do {
    let i = 0;
    newAddress = BITBOX.Address.fromXPub(xpubkey, `0/${i}`);
    axios.get(`https://rest.bitcoin.com/v1/address/details/${newAddress}`)
      .then(res => {
        const data = res.data.totalReceivedSat;
        emptyAddress = data == 0 ? true : false;
        console.log(emptyAddress);
        /*
        if (data == 0) {
          console.log(data);
          emptyAddress = true;
        }
        else {
          console.log(newAddress);
          i++;
        }
        */
      })
  }
  while (emptyAddress)

  return newAddress;
}
