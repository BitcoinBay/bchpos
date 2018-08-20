import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import IMG from '../../images/bitcoin-bay.jpg';

export default class CustomerPOS extends Component {
  render() {
    return (
      <article>
        <img src={IMG} height="400" width="400" />
      </article>
    );
  }
}
