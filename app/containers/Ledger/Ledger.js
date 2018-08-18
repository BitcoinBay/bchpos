import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';

export default class Ledger extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Cashier POS Ledger</title>
          <meta name="description" content="CashierPOS Page" />
          <h1>Hello</h1>
        </Helmet>
      </article>
    );
  }
}
