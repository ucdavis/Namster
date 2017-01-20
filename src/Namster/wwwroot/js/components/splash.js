import React from 'react';

import styles from './splash.scss';

export default class Splash extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.cover} alt="Datacenter NAMs" />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>NamstR</h1>
        </div>

        {this.props.children}

        <div className={styles.footer}>
          <p className={styles.subTitle}>a CA&ES DO production</p>
        </div>
      </div>
    );
  }
}
