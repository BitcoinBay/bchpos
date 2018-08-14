/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import CustomerPOS from 'containers/CustomerPOS/Loadable';
import CashierPOS from 'containers/CashierPOS/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NavBar from '../../components/NavBar';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Helmet titleTemplate="%s BCHPOS">
      <meta name="description" content="A React.js Boilerplate application" />
    </Helmet>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/features" component={FeaturePage} />
      <Route path="/customerpos" component={CustomerPOS} />
      <Route path="/cashierpos" component={CashierPOS} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
