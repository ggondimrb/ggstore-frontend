import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import Cart from '../pages/Cart';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ProductManagement from '../pages/ProductManagement';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/login" component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/products" component={ProductManagement} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
