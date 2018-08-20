import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import Display from "../../components/Display";
import ButtonPanel from "../../components/ButtonPanel";
import calculate from "../../components/logic/calculate";
import './style.scss';

import QRCode from 'qrcode-react';

import { getBIP21URL, generateNewAddress } from '../../services/paymentApi';

import NumPad from "../../components/NumPad";

let xpub = "xpub6C6EThH99dAScJJP16oobAKyaVmviS9uNZR4n1dRZxz4icFuaYvLHRt8aKpaMQYsWNH17JxpcwS4EGcTv47UrH821UoY2utXaATFswDdiZK";

export default class CashierPOS extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      cryptoPrice: [],
      isLoading: false,
      url: xpub
    }
    /*
    this.state = {
      total: null,
      next: null,
      operation: null,
    };
    */
  }

  componentDidMount() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BCH,BTC,ETC,ETH,LTC&tsyms=AUD,CAD,EUR,GBP,USD')
      .then(res => {
        const cryptos = res.data;
        this.setState({cryptoPrice: cryptos});
      });
  }

  handleClick = () => {
    this.setState({ isLoading: true });
    let paymentAddress = generateNewAddress(xpub);
    let paymentURL = getBIP21URL(paymentAddress, 0.5, "Sample Text");
    this.setState({ url: paymentURL });
  }

  render() {
    const { isLoading, url } = this.state;
    return (
      <div className="Cashier-page">
        <Helmet>
          <title>Cashier POS Page</title>
          <meta name="description" content="CashierPOS Page" />
        </Helmet>
        <h1>CashierPOS</h1>
        <div className="component-app">
          <QRCode value={url} />
          <Button
            disabled={isLoading}
            onClick={!isLoading ? this.handleClick : null}
          >
            {isLoading ? 'Loading...' : 'Loading state'}
          </Button>
          {/*
            <Display value={this.state.next || this.state.total || "0"} />
            <ButtonPanel clickHandler={this.handleClick} />
          */}
        </div>
      </div>
    );
  }
}
