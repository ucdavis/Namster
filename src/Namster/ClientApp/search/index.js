import React from 'react';
import { Card } from 'react-toolbox';

import * as SearchService from '../services/search';

import SearchInput from './input';
import FacetController from './facetController';
import Results from './table';
import styles from './index.scss';

export default class Index extends React.Component {

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
    const { router, location } = this.props;
    router.push({
      pathname: location.pathname
    });
  }

  _onFacetSelect = (category, key) => {
    const { router, location } = this.props;
    const query = { ...location.query, [category]: key };
    router.push({
      pathname: location.pathname,
      query
    });
  }

  _onSearch = (terms) => {
    const { router, location } = this.props;
    router.push(...location, {
      pathname: `/search/${terms}`
    });
  }

  _searchIfNeeded(props) {
      const { params, location } = props;
      this.setState({ isSearching: true });
    SearchService.fetchResults({
      terms:      params.terms,
      building:   location.query.building,
      department: location.query.department,
      vlan:       location.query.vlan
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
    const { location } = this.props;
    const { aggregates, results, isSearching } = this.state;
    return (
      <div className={styles.main}>
        <div className={styles.facets}>
          <h2 className={styles.facetClear} onClick={this._onClearFacets}>Clear Filters</h2>
          <FacetController facets={aggregates} onChange={this._onFacetSelect} selected={location.query} />
        </div>
        <div className={styles.panel}>
          <div className={styles.inputContainer}>
            <SearchInput onSearch={this._onSearch} />
          </div>
          <Card>
            <Results className={styles.resultsContainer} displaySpinner={isSearching} results={results} />
          </Card>
        </div>
      </div>
    );
  }
}
