import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'

import Routes from './routes';
import configureStore, { history } from './store/configureStore';

import styles from './app.scss';

const store = configureStore();

const App = () => (
  <Provider store={store} className={styles.app}>
    <ConnectedRouter history={history} >
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export default App;
