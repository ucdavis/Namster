import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from './containers/Root'

import SplashVideo from './components/SplashVideo'
import SearchMain from './containers/SearchMain'
import ListView from './containers/List'

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={SplashVideo} />
    <Route path="search" component={SearchMain} />
    <Route path="list" component={ListView} />
  </Route>
)
