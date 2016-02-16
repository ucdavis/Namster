import * as ActionTypes from '../actions/search'
import { combineReducers } from 'redux'

import query from './query'
import results from './results'

function searchIsDirty(state = false, action) {
  switch (action.type){
    case ActionTypes.DIRTY_SEARCH:
      return true
  }

  return state
}

const searchReducer = combineReducers({
  searchIsDirty,
  query,
  results
})

export default searchReducer
