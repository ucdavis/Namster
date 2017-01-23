import React from 'react';

import SearchInput from '../search/input';

import styles from './splash.scss';

export default class Splash extends React.Component {

  _onSearch = (terms) => {
    const { router, location } = this.props;
    router.push(...location, {
      pathname: `/search/${terms}`
    });
  }

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.cover} alt="Datacenter NAMs" />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>NamstR</h1>
        </div>

        <div className={styles.searchContainer}>
          <SearchInput onSearch={this._onSearch} />
        </div>

        <div className={styles.footer}>
          <p className={styles.subTitle}>a CA&ES DO production</p>
        </div>
      </div>
    );
  }
}
