//import $ from 'jquery';
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { TopNav } from '../components/TopNav'

import { getParameterByName } from '../functions/location'

import * as SearchActions from '../actions/search'

class Root extends React.Component {
    constructor(props) {
        super(props);

        this._searchTimer = 0;
    }

    componentDidMount() {
      const { query } = this.props
      if (query) {
          this._setSearchActive();
      }
    }

    onQueryFocus(event) {
        this._setSearchActive();
    }

    _setSearchActive() {
      const { dispatch } = this.props
      dispatch(SearchActions.dirtySearch());

      $("#background").addClass('fadeout');
      $("#herotitle").addClass('fadeout');
      setTimeout(function(){
          $("#background").css('height', '150px');
      }, 333);
    }

    onQueryChange(event) {
      const { dispatch } = this.props
      var value = event.target.value
      dispatch(SearchActions.clearFilters())
      dispatch(SearchActions.setQuery(value))

      this._resetSearch()
    }

    // delay start search by 500 ms
    _resetSearch() {
        const { dispatch } = this.props
        dispatch(SearchActions.setSearching(true));

        clearTimeout (this._searchTimer);
        this._searchTimer = setTimeout(this._startSearch.bind(this), 500);
    }

    _startSearch() {
        const { dispatch, query, filters } = this.props

        var terms = 'term=' + encodeURIComponent(query);

        if (filters.building) {
            terms += '&building=' + encodeURIComponent(filters.building);
        }

        if (filters.department) {
            terms += '&department=' + encodeURIComponent(filters.department);
        }

        if (filters.vlan) {
            terms += '&vlan=' + encodeURIComponent(filters.vlan);
        }

        self._request = $.get('/search/query?' + terms)
            .success(function(data) {
                dispatch(SearchActions.setResults(data.results))
                dispatch(SearchActions.setAggregates(data.aggregates))
                window.history.pushState({"query":data},"Search Results", '?' + terms);
            })
            .done(function() {
                dispatch(SearchActions.setSearching(false));
            });
    }

    render() {
        const { children, query, searchIsDirty } = this.props

        var mainClass = searchIsDirty ? "search-dirty" : "search-clean"
        return (
          <div className={mainClass}>
            <TopNav query={query}
                    onSearchFocus={this.onQueryFocus.bind(this)}
                    onSearchChange={this.onQueryChange.bind(this)} />
            {children}
          </div>
        );
    }
}

Root.propTypes = {
  searchIsDirty: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  query: PropTypes.string,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state, props) {
  return state.search
}

function mapDispathToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Root)
