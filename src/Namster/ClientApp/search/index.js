import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Card } from 'react-toolbox';

import * as SearchService from '../services/search';

import SearchInput from './input';
import FacetController from './facetController';
import Results from './table';
import styles from './index.scss';
import queryString from 'query-string';

class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      aggregates: {},
      results: [],
      isSearching: false
    };
  }

  componentDidMount() {
    this._searchIfNeeded(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this._searchIfNeeded(nextProps);
  }

  _onClearFacets = () => {
    const { push, location } = this.props;
    push(location.pathname);
  }

  _onFacetSelect = (category, key) => {
    const { push, location } = this.props;
    const parsed = queryString.parse(location.search);
    const query = { ...parsed, [category]: key };
    push({
      ...location,
      search: queryString.stringify(query)
    });
  }

  _onSearch = (terms) => {
    const { push, location } = this.props;
    push({ ...location,
      pathname: `/search/${terms}`
    });
  }

  _searchIfNeeded(props) {
    const { location, terms } = props;
    this.setState({ isSearching: true });
    const parsed = queryString.parse(location.search);
    SearchService.fetchResults({
      ...parsed,
      terms: terms,
    })
    .then((r) => {
      this.setState({
        aggregates: r.aggregates,
        results: r.results,
        isSearching: false
      });
    });
  }

  render() {
      const { aggregates, results, isSearching } = this.state || {};
      const { location, terms } = this.props;
      const query = queryString.parse(location.search);
    return (
      <div className={styles.main}>
        <div className={styles.facets}>
          <h2 className={styles.facetClear} onClick={this._onClearFacets}>Clear Filters</h2>
          <FacetController facets={aggregates} onChange={this._onFacetSelect} selected={query} />
        </div>
        <div className={styles.panel}>
          <div className={styles.inputContainer}>
            <SearchInput onSearch={this._onSearch} value={terms} key={terms} /> 
            {/* key={terms} forces creation of new SearchInput on change in terms, resulting in matching internal value state */}
          </div>
          <Card>
            <Results className={styles.resultsContainer} displaySpinner={isSearching} results={results} />
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
    const { match: { params: { terms = '' } = {} } = {} } = props;
    return {
        location: state.router.location,
        terms
    };
};

export default withRouter(connect(mapStateToProps, { push })(Index));
