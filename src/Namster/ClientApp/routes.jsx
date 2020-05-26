import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppLayout from './layout';
import Splash from './components/splash';

const Routes = () => {
    return (
        <div>
            <Route exact path="/"><Splash /></Route>
            <Route path="/"><AppLayout /></Route>
            </div>
            );
};

export default Routes;

if (module.hot) {
  module.hot.accept();
}
