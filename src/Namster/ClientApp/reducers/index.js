import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import searchReducer from './search';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  search: searchReducer,
});

export default createRootReducer ;
