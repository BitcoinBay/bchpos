import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import Display from "../../components/Display";
import ButtonPanel from "../../components/ButtonPanel";
import calculate from "../../components/logic/calculate";
import './style.scss';

import {getBIP21URL} from '../../services/paymentApi';

import NumPad from "../../components/NumPad";

export default class CashierPOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      next: null,
      operation: null
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
          <meta name="description" content="CashierPOS Page"/>
        </Helmet>
        <h1>CashierPOS</h1>
        <div className="component-app">
          <Display value={this.state.next || this.state.total || "0"}/>
          <ButtonPanel clickHandler={this.handleClick}/>
        </div>
      </div>
    );
  }
}
