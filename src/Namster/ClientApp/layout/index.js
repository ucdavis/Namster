import React from 'react'
import { Layout, Panel } from 'react-toolbox';
import { Route, Switch } from 'react-router-dom';
import Search from '../search';

import styles from './index.scss';

export default class AppLayout extends React.Component {
  render() {
    return (
      <div>
        <Layout className={styles.main}>
          <Panel>
            <Switch>
              <Route path="/search/:terms?"> <Search /></Route>
            </Switch>
          </Panel>
        </Layout>
      </div>
    );
  }
}
