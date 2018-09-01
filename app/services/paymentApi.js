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
3. scan addresses of the external chain; respect the gap limit (20) described below
4. if no transactions are found on the external chain, stop discovery
5. if there are some transactions, increase the account index and go to step 1

https://rest.bitcoin.com/v1/address/details/[%221BFHGm4HzqgXXyNX8n7DsQno5DAC4iLMRA%22,%22bitcoincash:qp7ekaepv3wf2nq035hevcma4x9sxmp3w56048g6ra%22,%20%221PY6YRssqLWCWFLvJfcCk6ZaKK5DsU7Jyz%22,%20%20%221Atyy5h4SSdqWRuS8pzxgTb4bMe7ZpdunP%22,%20%2218CisDmjM1MmM1MjtqUHPgmoLhZcSJJTKD%22,%20%20%221Pqth7yp5ZkTSbx6Tr8vmTN2ACedB7MeEV%22]
*/

export function searchEmptyAddress(xpubkey) {
  initBITBOX();
  let emptyAddressArray = [];
  let POSTRequest = '';
  let i = 0;
  let output;

  while (emptyAddressArray.length == 0) {
    for (i = 0; i < 20; i++) {
      let checkAddress = BITBOX.Address.fromXPub(xpubkey, `0/${i}`);
      emptyAddressArray.push(checkAddress);
      POSTRequest = POSTRequest + "%22" + checkAddress + "%22";
      if (i != 19) {
        POSTRequest = POSTRequest + ",";
      }
    }

    let output = axios
      .get(`https://rest.bitcoin.com/v1/address/details/%5B${POSTRequest}%5D`)
      .then(res => {
        return res.data;
      })
      .then(res => {
        console.log(res);
      });
  }
/*
    let output = axios
      .get(`https://rest.bitcoin.com/v1/address/details/%5B${POSTRequest}%5D`)
      .then(res => {
        for (i = 0; i < res.length; i++) {
          if (res.data[i].totalReceivedSat == 0) {
            emptyAddressArray.push(res.data[i].cashAddress);
          }
        }
        console.log(emptyAddressArray);
      })
  }
*/
//  console.log(newAddress);
  return emptyAddressArray;
}

export function generateNewAddress(xpubkey, index) {
  initBITBOX();
  let newAddress = BITBOX.Address.fromXPub(xpubkey, `0/${index}`);
//  console.log(newAddress);
  return newAddress;
}
