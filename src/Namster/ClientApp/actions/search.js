
export const SET_QUERY_TERMS = 'SET_QUERY_TERMS';
export function setQueryTerms(terms) {
  return {
    type: SET_QUERY_TERMS,
    terms
  };
}

export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export function clearFilters() {
  return {
    type: CLEAR_FILTERS
  };
}

export const SET_FILTER = 'SET_FILTER';
export function setFilter(category, value) {
  return {
    type: SET_FILTER,
    category,
    value
  };
}

export const SET_RESULTS = 'SET_RESULTS';
export function setResults(results) {
  return {
    type: SET_RESULTS,
    results
  };
}

export const CLEAR_RESULTS = 'CLEAR_RESULTS';
export function clearResults() {
  return {
    type: CLEAR_RESULTS
  };
}

export const SET_AGGREGATES = 'SET_AGGREGATES';
export function setAggregates(aggregates) {
  return {
    type: SET_AGGREGATES,
    aggregates
  };
}

export const CLEAR_AGGREGATES = 'CLEAR_AGGREGATES';
export function clearAggregates() {
  return {
    type: CLEAR_AGGREGATES
  };
}

export const SET_SEARCHING = 'SET_SEARCHING';
export function setSearching(searching) {
  return {
    type: SET_SEARCHING,
    searching
  };
}

export const DIRTY_SEARCH = 'DIRTY_SEARCH';
export function dirtySearch() {
  return {
    type: DIRTY_SEARCH
  };
}
