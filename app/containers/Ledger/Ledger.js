import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';

export default class Ledger extends Component {
  render() {
    return (
      <article>
        <Helmet>
          <title>Cashier POS Ledger</title>
          <meta name="description" content="Ledger" />
        </Helmet>
      </article>
    );
  }
}
