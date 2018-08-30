import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import QRCode from 'qrcode-react';
import socketClient from 'socket.io-client';
import './style.scss';
import openSocket from 'socket.io-client';
import IMG from '../../images/bitcoin-bay.jpg';

const socket = openSocket('http://localhost:3000');

const defaultWebURL = 'https://www.meetup.com/The-Bitcoin-Bay';

export default class CustomerPOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountC: 0,
      amountF: 0,
      url: '',
      price: 0,
    };
  }

  componentDidMount() {
    socket.on('event', msg => this.update(msg));
  }

  update(data) {
    this.setState({
      amountC: data[0],
      amountF: data[1],
      url: data[2],
      price: data[3],
    }, () => console.log(this.state));
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Customer POS Page</title>
          <meta name="description" content="CashierPOS Page" />
        </Helmet>
        <img src={IMG} height="400" width="400" alt="logo" />
        <h4>Price</h4>
        <p>
$
          {this.state.price}
          {' '}
CAD
        </p>
        <h4>BCH</h4>
        <p>
          {this.state.amountC}
          {' '}
BCH
        </p>
        <h4>CAD</h4>
        <p>
$
          {this.state.amountF}
          {' '}
CAD
        </p>
        { this.state.url === ''
          ? <QRCode value={defaultWebURL} />
          : (
            <div>
              <QRCode value={this.state.url} />
              <p>{this.state.url}</p>
            </div>
          )
        }
      </article>
    );
  }
}
