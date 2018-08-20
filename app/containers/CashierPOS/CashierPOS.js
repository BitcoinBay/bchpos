import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import './style.scss';
import QRCode from 'qrcode-react';
import NumPad from 'react-numpad';
import socketClient from 'socket.io-client';

let BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
let BITBOX = new BITBOXCli();

let langs = [
  'english',
  'chinese_simplified',
  'chinese_traditional',
  'korean',
  'japanese',
  'french',
  'italian',
  'spanish'
]

let lang = langs[Math.floor(Math.random() * langs.length)];

// create 256 bit BIP39 mnemonic
let mnemonic = BITBOX
  .Mnemonic
  .generate(256, BITBOX.Mnemonic.wordLists()[lang])

// root seed buffer
let rootSeed = BITBOX
  .Mnemonic
  .toSeed(mnemonic);

// master HDNode
let masterHDNode = BITBOX
  .HDNode
  .fromSeed(rootSeed, 'bitcoincash');

// extended public key
let xpubkey = BITBOX
  .HDNode
  .toXPub(masterHDNode);

// HDNode of BIP44 account
let account = BITBOX
  .HDNode
  .derivePath(masterHDNode, "m/44'/145'/0'");

// derive the first external change address HDNode which is going to spend utxo
let change = BITBOX
  .HDNode
  .derivePath(account, "0/0");

// get the cash address
let cashAddress = BITBOX
  .HDNode
  .toCashAddress(change);

// BIP21 Payment URL
let bip21options = {
  amount: 0.00015, //Value in BTC decimals
  label: "Test BIP21 Payment URL"
};

export default class CashierPOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: mnemonic,
      lang: lang,
      endpoint: "127.0.0.1:3000"
    }
  }
  send = () => {
    const socket = socketIOClient(this.state.endpoint)

    socket.emit()
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    // let addresses = []; for (let i = 0; i < 10; i++) {   let account =
    // masterHDNode.derivePath(`m/44'/145'/0'/0/${i}`);   addresses.push(     <li
    // key={i}>m/44&rsquo;/145&rsquo;/0&rsquo;/0/{i}: {BITBOX         .HDNode
    // .toCashAddress(account)}</li>   ); } let addressList = []; for (let i = 0; i
    // < 10; i++) {   let account =
    // masterHDNode.derivePath(`m/44'/145'/0'/0/${i}`);
    // addressList.push(BITBOX.HDNode.toCashAddress(account)); }

    return (
      <article>
        <Helmet>
          <title>Cashier POS Page</title>
          <meta name="description" content="CashierPOS Page"/>
        </Helmet>
        {/* <div>
          <section className='App-content'>
            <h2>BIP44 $BCH Wallet</h2>
            <h3>256 bit {lang}
              BIP39 Mnemonic:</h3>
            <p>{this.state.mnemonic}</p>
            <h3>BIP44 Account</h3>
            <p>
              <code>
                "m/44'/145'/0'"
              </code>
            </p>
            <h3>Extended Public Key</h3>
            <p>{xpubkey}</p>
            <QRCode value={xpubkey}/>
            <h3>BIP21 Payment URL</h3>
            <p>15 000 satoshis</p>
            <QRCode
              value={BITBOX
              .BitcoinCash
              .encodeBIP21(addressList[0], bip21options)}/>
            <h3>BIP44 external change addresses</h3>
            <ul>
              {addresses}
            </ul>
          </section>
        </div> */}
        <div className="pad">
          <NumPad.Number
            onChange={(value) => {
            console.log('value', value)
          }}
            label={'Total'}
            placeholder={'my placeholder'}
            value={100}/>
          <button type="button" className="btn btn-default">Pay with BCH</button>
        </div>
      </article>
    );
  }
}