import React from 'react';
import { Helmet } from 'react-helmet';
import Display from "../../components/Display";
import ButtonPanel from "../../components/ButtonPanel";
import calculate from "../../components/logic/calculate";
import './style.scss';

import QRCode from 'qrcode-react';
import NumPadMaterial from 'react-numpad-material';
import NumPad from 'react-numpad';
import { NumericInput } from 'numeric-keyboard';

import { getBIP21URL } from '../../services/paymentApi';

let BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
let BITBOX = new BITBOXCli();

export default class CashierPOS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      next: null,
      operation: null,
    };
  }

  handleClick = buttonName => {
    this.setState(calculate(this.state, buttonName));
  };

  render() {
    return (
      <div className="Cashier-page">
        <Helmet>
          <title>Cashier POS Page</title>
          <meta name="description" content="CashierPOS Page" />
        </Helmet>
        <h1>CashierPOS</h1>
        <label>Amount: </label>
        <div className="component-app">
          <Display value={this.state.next || this.state.total || "0"} />
          <ButtonPanel clickHandler={this.handleClick} />
        </div>
      </div>
    );
  }
}
