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
      const { location } = this.props
      if (location.pathname !== '/') {
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
      dispatch(SearchActions.clearResults())
      dispatch(SearchActions.clearAggregates())
      dispatch(SearchActions.setQueryTerms(value))

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
        const { dispatch } = this.props
        dispatch(SearchActions.fetchResultsIfNeeded())
    }

    render() {
        const { children, terms, searchIsDirty } = this.props

        var mainClass = searchIsDirty ? "search-dirty" : "search-clean"
        return (
          <div className={mainClass}>
            <TopNav terms={terms}
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
  terms: PropTypes.string,
  location: PropTypes.object,
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
