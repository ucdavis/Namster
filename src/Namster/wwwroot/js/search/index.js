import React from 'react';

import * as SearchService from '../services/search';

import SearchInput from './input';
import FacetController from './facetController';
import styles from './index.scss';

export default class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      aggregates: {},
      results: []
    };
  }

  componentDidMount() {
    this._searchIfNeeded();
  }

  componentWillReceiveProps(nextProps) {
    this._searchIfNeeded();
  }

  _onFacetSelect = (category, key) => {
    const { router, location } = this.props;
    const query = { ...location.query, [category]: key };
    router.push(...location, {
      query
    });
  }

  _onSearch = (terms) => {
    const { router, location } = this.props;
    router.push(...location, {
      pathname: `/search/${terms}`
    });
  }

  _searchIfNeeded() {
    const { params, location } = this.props;
    SearchService.fetchResults({
      terms: params.terms,
      building: location.query.building,
      department: location.query.department,
      vlan: location.query.vlan
    })
    .then((r) => {
      this.setState({
        aggregates: r.aggregates,
        results: r.results
      });
    });
  }

  render() {
    const { aggregates } = this.state;

    return (
      <div className={styles.main}>
        <div className={styles.facets}>
          <FacetController facets={aggregates} onChange={this._onFacetSelect} />
        </div>
        <div className={styles.panel}>
          <SearchInput className={styles.inputContainer} onSearch={this._onSearch} />
          {this.props.children}
        </div>
      </div>
    );
  }
}
