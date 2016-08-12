import fetch from 'isomorphic-fetch'
import { routeActions } from 'react-router-redux'

export const SET_QUERY_TERMS = 'SET_QUERY_TERMS'
export function setQueryTerms(terms) {
  return {
    type: SET_QUERY_TERMS,
    terms: terms
  }
}

export const CLEAR_FILTERS = 'CLEAR_FILTERS'
export function clearFilters() {
  return {
    type: CLEAR_FILTERS
  }
}

export const SET_FILTER = 'SET_FILTER'
export function setFilter(category, value) {
  return {
    type: SET_FILTER,
    category,
    value
  }
}

export const SET_RESULTS = 'SET_RESULTS'
export function setResults(results) {
  return {
    type: SET_RESULTS,
    results: results
  }
}

export const CLEAR_RESULTS = 'CLEAR_RESULTS'
export function clearResults() {
  return {
    type: CLEAR_RESULTS
  }
}

export const SET_AGGREGATES = 'SET_AGGREGATES'
export function setAggregates(aggregates) {
  return {
    type: SET_AGGREGATES,
    aggregates: aggregates
  }
}

export const CLEAR_AGGREGATES = 'CLEAR_AGGREGATES'
export function clearAggregates() {
  return {
    type: CLEAR_AGGREGATES
  }
}

export const SET_SEARCHING = 'SET_SEARCHING'
export function setSearching(searching) {
  return {
    type: SET_SEARCHING,
    searching: searching
  }
}

export const DIRTY_SEARCH = 'DIRTY_SEARCH'
export function dirtySearch() {
  return {
    type: DIRTY_SEARCH
  }
}

function fetchResults(state) {
  return (dispatch) => {
    const { terms, filters } = state.search

    var query = 'term=' + encodeURIComponent(terms);

    if (filters.building) {
        query += '&building=' + encodeURIComponent(filters.building);
    }

    if (filters.department) {
        query += '&department=' + encodeURIComponent(filters.department);
    }

    if (filters.vlan) {
        query += '&vlan=' + encodeURIComponent(filters.vlan);
    }

    dispatch(setSearching(true))
    dispatch(routeActions.push('/search?' + query))

    return fetch('/api/search/query?' + query)
        .then(res => res.json())
        .then(json => {
            dispatch(setResults(json.results))
            dispatch(setAggregates(json.aggregates))
        })
        .then(() => setSearching(false))
  }
}

export function fetchResultsIfNeeded() {
  return (dispatch, getState) => {
    var state = getState()
    if (state.search.terms) {
      return dispatch(fetchResults(getState()))
    }
  }
}
