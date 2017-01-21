import React from 'react'
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';

import styles from './index.scss';

export default class AppLayout extends React.Component {
  render() {
    return (
      <div>
        <Layout className={styles.main}>
          <Panel>
            {this.props.children}
          </Panel>
        </Layout>
      </div>
    );
  }
}
