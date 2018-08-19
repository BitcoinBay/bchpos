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

let xpub = "xpub661MyMwAqRbcErN1xZmUUnLmXXjyLoeVg5i5PWcDbCyCCWdbu9bxnYMPPeeEXzJNK3TS76rg2H9HcG72cJyWz26iAHfFv1qC9P594b2yMA8";

export default class CashierPOS extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      cryptoPrice: [],
      isLoading: false,
      url: "xpub661MyMwAqRbcErN1xZmUUnLmXXjyLoeVg5i5PWcDbCyCCWdbu9bxnYMPPeeEXzJNK3TS76rg2H9HcG72cJyWz26iAHfFv1qC9P594b2yMA8"
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
        console.log(cryptos);
        this.setState({cryptoPrice: cryptos});
      });
    axios.get('https://rest.bitcoin.com/v1/address/details/bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c')
      .then(res => {
        const data = res.data.balanceSat;
        console.log(data);
      })
  }

  handleClick = () => {
    this.setState({ isLoading: true });
    let paymentAddress = generateNewAddress(xpub);
    let paymentURL = getBIP21URL(paymentAddress, 0.5, "Sample Text");
    console.log(paymentURL);
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
