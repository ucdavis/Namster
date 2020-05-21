import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/Link';

import styles from './topNav.scss';

export default class TopNav extends React.Component {

  constructor(props) {
    super(props);

        // set random placeholder
    const placeholders = ['Find the perfect NAM for you', 'What would you like to NAM today?', 'Your ideal NAM is waiting for you...'];
    this._searchPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];
  }

  _onSearchFocus = (event) => {
    if (this.props.onSearchFocus) {
      this.props.onSearchFocus(event);
    }
  }

  _onSearchChange = (event) => {
    if (this.props.onSearchChange) {
      this.props.onSearchChange(event);
    }
  }

  render() {
    return (
      <AppBar title="" leftIcon="menu" className={styles.topNav}>
        <Navigation type="horizontal">
          <Link href="http://" label="Inbox" icon="inbox" />
          <Link href="http://" active label="Profile" icon="person" />
        </Navigation>
      </AppBar>
    );
  }
}
