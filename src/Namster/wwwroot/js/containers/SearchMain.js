//import $ from 'jquery';
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import LinearProgress from 'material-ui/lib/linear-progress'
import CircularProgress from 'material-ui/lib/circular-progress'

import { TopNav } from '../components/TopNav'
import { SearchResultList } from '../components/Results';
import { FacetList } from '../components/Facets'

import { getParameterByName } from '../functions/location'

import * as SearchActions from '../actions/search'

function loadData(props) {

}

class SearchMain extends React.Component {
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

    onFacetSelect(category, key, value) {
        const { dispatch } = this.props
        var target = value ? key : false
        dispatch(SearchActions.setFilter(category, target))

        this._resetSearch();
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
        const { searching, searchIsDirty, query, results, aggregates, filters } = this.props

        var content = null;
        if (searching) {
            content = <CircularProgress mode="indeterminate" size={4} />;
        }
        else if (results) {
            content =  <SearchResultList results={results} />;
        }
        else {
            content = <div></div>;
        }

        var mainClass = searchIsDirty ? "search-dirty" : "search-clean";

        return (
          <div className={mainClass}>
            <TopNav query={query}
                    onSearchFocus={this.onQueryFocus.bind(this)}
                    onSearchChange={this.onQueryChange.bind(this)} />
            <div className="container content-wrapper">
              <div className="row">
                <div className="col-md-3 facet-wrapper">
                    <FacetList facets={aggregates} onChange={this.onFacetSelect.bind(this)} filters={filters} />
                </div>
                <div className="col-md-9 results-wrapper">
                    {content}
                </div>
              </div>
            </div>
          </div>
        );
    }
}

SearchMain.propTypes = {
  searchIsDirty: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  query: PropTypes.string,
  results: PropTypes.array,
  aggregates: PropTypes.object,
  filters: PropTypes.object
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
)(SearchMain)
