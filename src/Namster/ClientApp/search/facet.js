import React from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox';
import Checkbox from 'react-toolbox/lib/checkbox';
import ClassNames from 'classnames';

import styles from './facet.scss';

export default class Facet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      expanded: false
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

  _toggleExpand = (event) => {
    this.setState({
      expanded: !this.state.expanded
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
            <div className={styles.labelText} title={item.key}>{item.key}</div>
            <div className={styles.labelCount}>({item.docCount})</div>
          </div>
        }
        onChange={(value) => this._onCheck(item.key, value)}
        theme={{ text: styles.labelContainer }}
      />
    );
  }

  renderExpando() {
    if (this.props.items.length <= 5) {
      return null;
    }

    const text = this.state.expanded ? 'Show Less' : 'Show More';
    return (
      <span className={styles.expandToggle} onClick={this._toggleExpand}>{text}</span>
    );
  }

  render() {
    let { items } = this.props;
    if (items.length > 5 && !this.state.expanded) {
      items = items.slice(0, 5);
    }

    return (
      <Card className={ClassNames({ [styles.collapsed]: this.state.collapsed })}>
        <CardTitle className={styles.headerContainer} onClick={this._toggleCollapse}>
          <h2>{this.props.header}</h2>
          <i className={ClassNames('material-icons', styles.collapseToggle)}>keyboard_arrow_up</i>
        </CardTitle>
        <CardText className={styles.facetContainer}>
          {items.map((item) => this.renderFacet(item))}
          { this.renderExpando() }
        </CardText>
      </Card>
    );
  }
}
