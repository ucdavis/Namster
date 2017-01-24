import React from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import ClassNames from 'classnames';

import styles from './facet.scss';

export default class Facet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  _onCheck = (key, value) => {
    // if unchecking, clear selected key
    const selectedKey = value ? key : '';

    if (this.props.onChange) {
      this.props.onChange(selectedKey);
    }
  }

  _toggleCollapse = (event) => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  renderFacet(item) {
    const selected = (this.props.selectedKey === item.key);

    return (
      <Checkbox
        key={item.key}
        checked={selected}
        label={
          <div className={styles.label}>
            <div>{item.key}</div>
            <div className={styles.labelCount}>({item.docCount})</div>
          </div>
        }
        onChange={(value) => this._onCheck(item.key, value)}
        theme={{ text: styles.labelContainer }}
      />
    );
  }

  render() {
    const { items } = this.props;

    return (
      <div className={ClassNames({ [styles.collapsed]: this.state.collapsed })}>
        <div className={styles.headerContainer} onClick={this._toggleCollapse}>
          <h2>{this.props.header}</h2>
          <i className={ClassNames('material-icons', styles.collapseToggle)}>keyboard_arrow_up</i>
        </div>
        <div className={styles.facetContainer}>
          {items.map((item) => this.renderFacet(item))}
        </div>
      </div>
    );
  }
}
