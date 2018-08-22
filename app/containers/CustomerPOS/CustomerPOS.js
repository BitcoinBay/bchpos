import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import socketClient from 'socket.io-client';
import './style.scss';
import openSocket from 'socket.io-client';
import IMG from '../../images/bitcoin-bay.jpg';

const socket = openSocket('http://localhost:3000');

function event(msg) {
  socket.on('event', (msg) => {
    console.log(msg);
  });
}
export default class CustomerPOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    };
  }

  componentDidMount() {
    socket.on('event', msg => this.update(msg));
  }

  update(data) {
    this.setState({
      test: data,
    }, () => console.log(this.state.test));
  }

  render() {
    return (
      <article>
        <img src={IMG} height="400" width="400" />
        <h1>{this.state.test}</h1>
      </article>
    );
  }
}
