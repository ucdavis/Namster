import * as ActionTypes from '../actions/search'
import { combineReducers } from 'redux'

const initialQuery = ''

function query(state = initialQuery, action) {
  switch (action.type){
    case ActionTypes.SET_QUERY:
      return action.query
  }

  return state
}

export default query
