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

import { clearFilters, dirtySearch, setQuery } from '../actions/search'

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
      dispatch(dirtySearch());

      $("#background").addClass('fadeout');
      $("#herotitle").addClass('fadeout');
      setTimeout(function(){
          $("#background").css('height', '150px');
      }, 333);
    }

    onQueryChange(event) {
      const { dispatch } = this.props
      var value = event.target.value
      dispatch(clearFilters())
      dispatch(setQuery(value))
    }

    onFacetSelect(category, key, value) {
        var target = {};

        if (value){
            target[category] = key;
        }
        else {
            target[category] = false;
        }

        this.setState(target)
        this.setState({searching: true});
        this._resetSearch();
    }

    // delay start search by 500 ms
    _resetSearch() {
        clearTimeout (this._searchTimer);
        this._searchTimer = setTimeout(this._startSearch.bind(this), 500);
    }

    _startSearch() {
        var self = this;
        var terms = 'term=' + encodeURIComponent(self.state.query);

        if (self.state.building) {
            terms += '&building=' + encodeURIComponent(self.state.building);
        }

        if (self.state.department) {
            terms += '&department=' + encodeURIComponent(self.state.department);
        }

        if (self.state.vlan) {
            terms += '&vlan=' + encodeURIComponent(self.state.vlan);
        }

        self._request = $.get('/search/query?' + terms)
            .success(function(data) {
                self.setState({results: data.results});
                self.setState({aggregates: data.aggregates});
                window.history.pushState({"query":data},"Search Results", '?' + terms);
            })
            .done(function() {
                self.setState({searching: false});
            });
    }

    render() {
        const {
          searching, searchIsDirty, query, results, aggregates,
          building, department, vlan
       } = this.props

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
                    <FacetList facets={aggregates} onChange={this.onFacetSelect.bind(this)}
                        building={building} department={department} vlan={vlan}
                       />
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
  building: PropTypes.string,
  department: PropTypes.string,
  vlan: PropTypes.string,
  results: PropTypes.array
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
