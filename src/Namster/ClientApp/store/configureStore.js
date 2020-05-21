import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

import rootReducer from '../reducers';

const loggerMiddleware = createLogger();
const reduxRouterMiddleware = syncHistory(browserHistory);

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    applyMiddleware(
      reduxRouterMiddleware,
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // neat middleware that logs actions
    ),
    initialState
  );
}
