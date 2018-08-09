import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';

let BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
let BITBOX = new BITBOXCli();

export default class BCHPOS extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="feature-page">
        <Helmet>
          <title>Feature Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <h1>BCHPOS</h1>
      </div>

    );
  }
}
