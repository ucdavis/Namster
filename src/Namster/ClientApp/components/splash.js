import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import SearchInput from '../search/input';

import styles from './splash.scss';

class Splash extends React.Component {

  _onSearch = (terms) => {
    const { push } = this.props;
    push(`/search/${terms}`);
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

export default connect(null, { push })(Splash)
