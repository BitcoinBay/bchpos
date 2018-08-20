import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import CustomerPOS from 'containers/CustomerPOS/Loadable';
import CashierPOS from 'containers/CashierPOS/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NavBar from '../../components/NavBar';
import Login from '../Login/Loadable';
import Register from '../Register/Loadable';
import Ledger from '../Ledger/Loadable';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Helmet titleTemplate="%s BCHPOS" />
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/customerpos" component={CustomerPOS} />
      <Route path="/cashierpos" component={CashierPOS} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/ledger" component={Ledger} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);
export default App;
