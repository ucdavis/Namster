import React from 'react';

import SearchInput from '../search/input';

import styles from './splash.scss';

export default class Splash extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.cover} alt="Datacenter NAMs" />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>NamstR</h1>
        </div>

        <div className={styles.searchContainer}>
          <SearchInput />
        </div>

        <div className={styles.footer}>
          <p className={styles.subTitle}>a CA&ES DO production</p>
        </div>
      </div>
    );
  }
}
