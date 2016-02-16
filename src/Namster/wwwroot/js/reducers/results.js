import * as ActionTypes from '../actions/search'
import { combineReducers } from 'redux'

const initialResults = []

function results(state = [], action) {
  switch (action.type){
    case ActionTypes.SET_RESULTS:
      return action.results
  }

  return state
}

export default results
