import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import axios from 'axios';
import SignIn from '../../components/SignIn';

export default class Login extends Component {
  render() {
    return (<SignIn />);
  }
}
