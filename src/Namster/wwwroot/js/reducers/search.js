import * as ActionTypes from '../actions/search'
import { combineReducers } from 'redux'


function searchIsDirty(state = false, action) {
  switch (action.type){
    case ActionTypes.DIRTY_SEARCH:
      return true
  }

  return state
}

function terms(state = '', action) {
  switch (action.type){
    case ActionTypes.SET_QUERY_TERMS:
      return action.terms
  }

  return state
}

function results(state = [], action) {
  switch (action.type){
    case ActionTypes.SET_RESULTS:
      return action.results
    case ActionTypes.CLEAR_RESULTS:
      return []
  }

  return state
}

function aggregates(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SET_AGGREGATES:
      return action.aggregates
    case ActionTypes.CLEAR_AGGREGATES:
      return {}
  }

  return state
}

const defaultFilters = {
  building: false,
  department: false,
  vlan: false
}
function filters(state = defaultFilters, action) {
  switch (action.type) {
    case ActionTypes.SET_FILTER:
      return Object.assign({}, state, 
      {
        [action.category]: action.value || false
      })
    case ActionTypes.CLEAR_FILTERS:
      return defaultFilters
  }

  return state
}

const searchReducer = combineReducers({
  searchIsDirty,
  terms,
  results,
  aggregates,
  filters
})

export default searchReducer
