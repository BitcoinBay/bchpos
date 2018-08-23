import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import QRCode from 'qrcode-react';
import socketClient from 'socket.io-client';
import './style.scss';
import openSocket from 'socket.io-client';
import IMG from '../../images/bitcoin-bay.jpg';

const socket = openSocket('http://localhost:3000');

let defaultWebURL = "https://www.meetup.com/The-Bitcoin-Bay";

export default class CustomerPOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountC: 0,
      amountF: 0,
      url: ''
    };
  }

  componentDidMount() {
    socket.on('event', msg => this.update(msg));
  }

  update(data) {
    this.setState({
      amountC: data[0],
      amountF: data[1],
      url: data[2]
    }, () => console.log(this.state));
  }

  render() {
    return (
      <article>
        <img src={IMG} height="400" width="400"/>
        <h2>BCH</h2>
        <h1>{this.state.amountC}</h1>
        <h2>CAD</h2>
        <h1>{this.state.amountF}</h1>
        <QRCode value={ this.state.url == '' ? defaultWebURL : this.state.url } />
      </article>
    );
  }
}
