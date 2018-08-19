import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';

export default class Login extends Component {
  render() {
    const style = {
      margin: '15px 0',
    };
    return (
      <div className="login-container">
        <div className="title">
          Login
        </div>
        <FluidInput type="text" label="username" id="username" style={style} />
        <FluidInput type="password" label="password" id="password" style={style} />
        <Button type="sumbit" buttonText="log in" buttonClass="login-button" />
      </div>
    );
  }
}
