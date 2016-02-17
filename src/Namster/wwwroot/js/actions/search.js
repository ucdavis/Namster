export const SET_QUERY = 'SET_QUERY'
export function setQuery(query) {
  return {
    type: SET_QUERY,
    query: query
  }
}

export const CLEAR_FILTERS = 'CLEAR_FILTERS'
export function clearFilters() {
  return {
    type: CLEAR_FILTERS
  }
}

export const SET_FILTER = 'SET_FILTER'
export function setFilter(category, value){
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

export const SET_AGGREGATES = 'SET_AGGREGATES'
export function setAggregates(aggregates) {
  return {
    type: SET_AGGREGATES,
    aggregates: aggregates
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
    type: DIRTY_SEARCH,
  }
}

export function searchQuery() {
  return (dispatch, getState) => {
    var state = getState()
    var terms = 'term=' + encodeURIComponent(state.query)
    $.get('/search/query?' + terms)
        .success(function(data) {
          window.history.pushState({"query":data},"Search Results", '?' + terms)
          dispatch(setResults(data.results))
          dispatch(setAggregates(data.aggregates))
        })
        .done(function() {
          dispatch(setSearching(false))
        });
    }
}
