//import $ from 'jquery';
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import LinearProgress from 'material-ui/lib/linear-progress'
import CircularProgress from 'material-ui/lib/circular-progress'

import { TopNav } from '../components/TopNav'
import { SearchResultList } from '../components/Results';
import { FacetList } from '../components/Facets'

import { getParameterByName } from '../functions/location'

import * as SearchActions from '../actions/search'

class SearchMain extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(SearchActions.fetchResultsIfNeeded())
    }

    onFacetSelect(category, key, value) {
        const { dispatch } = this.props
        var target = value ? key : false
        dispatch(SearchActions.setFilter(category, target))
        dispatch(SearchActions.clearResults())
        dispatch(SearchActions.fetchResultsIfNeeded())
    }

    render() {
        const { searching, results, aggregates, filters } = this.props

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

        return (
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
        );
    }
}

SearchMain.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
