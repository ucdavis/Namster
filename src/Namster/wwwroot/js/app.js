import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import SearchMain from './containers/SearchMain'
import configureStore from './store/configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <SearchMain />
  </Provider>,
  document.getElementById('app')
);
