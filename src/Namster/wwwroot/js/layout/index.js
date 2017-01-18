import React from 'react'
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';

export default class AppLayout extends React.Component {
  render() {
    return (
      <Layout>
        <Panel>
          {this.props.children}
        </Panel>
      </Layout>
    );
  }
}
