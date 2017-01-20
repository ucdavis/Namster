import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppLayout from './layout';
import Home from './components/home';
import Splash from './components/splash'

export default (
  <Route path="/" component={AppLayout}>
    <IndexRoute component={Splash} />
    <Route path="home" component={Home} />
  </Route>
);
