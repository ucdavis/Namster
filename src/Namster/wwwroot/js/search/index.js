import React from 'react';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';

import SearchInput from './input';

import styles from './index.scss';

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerActive: true
    };
  }

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.facets}>
          <p>
              Facets go here
          </p>
        </div>
        <div className={styles.panel}>
          <SearchInput className={styles.inputContainer} />
          {this.props.children}
        </div>
      </div>
    );
  }
}
