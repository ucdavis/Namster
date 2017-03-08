import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppLayout from './layout';
import Splash from './components/splash';
import Search from './search';

export default (
  <Route path="/" component={AppLayout}>
    <IndexRoute component={Splash} />
    <Route path="search/:terms" component={Search} />
  </Route>
);
