import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import searchReducer from './search';

const rootReducer = combineReducers({
  search: searchReducer,
  routing: routeReducer
});

export default rootReducer;
