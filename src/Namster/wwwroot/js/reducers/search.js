import * as ActionTypes from '../actions/search'
import { combineReducers } from 'redux'


function searchIsDirty(state = false, action) {
  switch (action.type){
    case ActionTypes.DIRTY_SEARCH:
      return true
  }

  return state
}

function query(state = '', action) {
  switch (action.type){
    case ActionTypes.SET_QUERY:
      return action.query
  }

  return state
}

function results(state = [], action) {
  switch (action.type){
    case ActionTypes.SET_RESULTS:
      return action.results
  }

  return state
}

function aggregates(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SET_AGGREGATES:
      return action.aggregates
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
      var filter = {};
      filter[action.category] = action.value
      return Object.assign({}, state, filter)
  }

  return state
}

const searchReducer = combineReducers({
  searchIsDirty,
  query,
  results,
  aggregates,
  filters
})

export default searchReducer
