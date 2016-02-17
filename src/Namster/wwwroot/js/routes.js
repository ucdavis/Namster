import React from 'react'
import { Route, IndexRoute } from 'react-router'
import SearchMain from './containers/SearchMain'
import List from './containers/List'

export default (
  <Route path="/">
    <IndexRoute component={SearchMain} />
    <Route path="list" component={List} />
  </Route>
)
