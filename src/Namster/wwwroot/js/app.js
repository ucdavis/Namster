import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';
import configureStore from './store/configureStore';

import styles from './app.scss';

const store = configureStore();

const App = () => (
  <Provider store={store} className={styles.app}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
);

export default App;
