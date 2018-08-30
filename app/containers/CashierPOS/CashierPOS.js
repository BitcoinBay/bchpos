import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import CCC from './ccc-streamer-utilities';
import './style.scss';
import IMG from '../../images/bitcoin-bay.jpg';
import QRCode from 'qrcode-react';
import NumPad from 'react-numpad';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');
let BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
let BITBOX = new BITBOXCli();
const streamUrl = "https://streamer.cryptocompare.com/";
const socket1 = openSocket(streamUrl);
let prices = {};
const subscription = ['5~CCCAGG~BCH~CAD'];
//socket1.emit('SubAdd', {subs: subscription});

socket1.on('m', (message) => {
  console.log(message);
});
import {getBIP21URL, generateNewAddress, searchEmptyAddress} from '../../services/paymentApi';

let xpub = "xpub6C6EThH99dAScJJP16oobAKyaVmviS9uNZR4n1dRZxz4icFuaYvLHRt8aKpaMQYsWNH17JxpcwS4EGcTv47UrH821UoY2utXaATFswDdiZK";

let defaultWebURL = "https://www.meetup.com/The-Bitcoin-Bay";

export default class CashierPOS extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this
      .handleClick
      .bind(this);
    this.updatePrices = this
      .updatePrices
      .bind(this);
    this.state = {
      cryptoPrice: [],
      isLoading: false,
      url: xpub,
      amountF: 0,
      amountC: 0,
      fiat: 'CAD',
      socketData: []
    }
    this.sendSocketIO = this
      .sendSocketIO
      .bind(this);
  }

  componentDidMount () {
    this.updatePrices();
    searchEmptyAddress(xpub);
  }

  sendSocketIO(msg) {
    socket.emit('event', msg);
  }
  convertPrice(fiat) {
    let convertedAmount = parseFloat(((parseFloat(1 / (this.state.cryptoPrice.CAD))) * fiat));
    return convertedAmount;
  }
  updatePrices() {
    axios
      .get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BCH,BTC,ETC,ETH,LTC&tsyms=${this.state.fiat}`)
      .then(res => {
        const crypto = res.data.BCH;
        this.setState({
          cryptoPrice: crypto
        }, () => console.log(this.state.cryptoPrice));
      })
  }

  handleClick = (payAmount) => {
    if (payAmount == 0) {
      return;
    } else {
      this.setState({
        isLoading: true,
      });
      let paymentValue = this.convertPrice(payAmount);
      let paymentAddress = generateNewAddress(xpub, 1);
      let paymentURL = getBIP21URL(paymentAddress, paymentValue, "Bitcoin Bay");
      this.updatePrices();
      this.setState({
        url: paymentURL,
        amountC: paymentValue,
        amountF: parseFloat(payAmount),
        isLoading: false
      });
    }
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Cashier POS Page</title>
          <meta name="description" content="CashierPOS Page"/>
        </Helmet>
        <img src={IMG} height="400" width="400"/>
        <h4>CashierPOS</h4>
        <div className="component-app">
          <h4>Price</h4>
          <p>{this.state.cryptoPrice.CAD}</p>
          {/*
            <Display value={this.state.next || this.state.total || "0"} />
            <ButtonPanel clickHandler={this.handleClick} />
          */}
          { this.state.url == xpub ? 
              <QRCode value={defaultWebURL} /> 
              :
              <div>
                <QRCode value={this.state.url} />
                <p>{this.state.url}</p>
                <h4>BCH</h4>
                <p>{this.state.amountC}</p>
              </div>
          }
          <div className="pad">
            <NumPad.Number
              onChange={(value) => {
              this.handleClick(value)
            }}
              label={'Total: $'}
              placeholder={'0'}
              position={'startTopLeft'}
              />
            <button
              type="button"
              className="btn btn-default pay"
              onClick={() => this.sendSocketIO([this.state.amountC, this.state.amountF, this.state.url, this.state.cryptoPrice.CAD])}>Pay with BCH</button>
          </div>
        </div>
      </article>
    );
  }
}
