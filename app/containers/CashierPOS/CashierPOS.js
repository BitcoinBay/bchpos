import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import CCC from './ccc-streamer-utilities';
import './style.scss';
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
socket1.emit('SubAdd', {subs: subscription});

socket1.on('m', (message) => {
  console.log(message);
});
import {getBIP21URL, generateNewAddress} from '../../services/paymentApi';

let xpub = "xpub6C6EThH99dAScJJP16oobAKyaVmviS9uNZR4n1dRZxz4icFuaYvLHRt8aKpaMQYsWNH17JxpcwS4" +
    "EGcTv47UrH821UoY2utXaATFswDdiZK";

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
      fiat: 'CAD'
    }
    this.sendSocketIO = this
      .sendSocketIO
      .bind(this);
  }

  sendSocketIO(msg) {
    socket.emit('event', msg);
  }
  convertPrice(fiat) {
    return parseFloat(((parseFloat(1 / (this.state.cryptoPrice.CAD))) * fiat));
  }
  updatePrices() {
    axios
      .get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BCH,BTC,ETC,ETH,LTC&tsyms=${this.state.fiat}`)
      .then(res => {
        const crypto = res.data.BCH;
        this.setState({
          cryptoPrice: crypto
        }, () => console.log(this.state));
      })
      .then(res => {
        this.setState({
          amountC: this.convertPrice(this.state.amountF)
        })
      });
  }

  // componentDidMount() {   let updateTimer = setInterval(this.updatePrices(),
  // 5000); } componentWillUnmount() {   clearInterval(this.updateTimer); } hard
  // coded xpub index "5", payment amount "0.5 BCH", and label text "Sample Text"
  handleClick = (payAmount) => {
    this.setState({isLoading: true});
    let paymentAddress = generateNewAddress(xpub, 5);
    let paymentURL = getBIP21URL(paymentAddress, payAmount, "Sample Text");
    this.setState({
      url: paymentURL,
      amountF: parseFloat(payAmount)
    }, () => console.log(this.state));
    this.updatePrices();
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Cashier POS Page</title>
          <meta name="description" content="CashierPOS Page"/>
        </Helmet>
        <h1>CashierPOS</h1>
        <div className="component-app">
          <QRCode value={this.state.url}/>
          <h1>Select your currency</h1>
          {/*
            <Display value={this.state.next || this.state.total || "0"} />
            <ButtonPanel clickHandler={this.handleClick} />
          */}
          <div className="pad">
            <NumPad.Number
              onChange={(value) => {
              this.handleClick(value)
            }}
              label={'Total'}
              placeholder={'my placeholder'}
              position={'startBottomLeft'}
              value={100}/>
            <button
              type="button"
              className="btn btn-default pay"
              onClick={() => this.sendSocketIO(this.state.amountC)}>Pay with BCH</button>
          </div>
        </div>
      </article>
    );
  }
}