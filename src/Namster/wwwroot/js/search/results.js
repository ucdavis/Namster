import React from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox';

import styles from './results.scss';

export default class Facet extends React.Component {

  renderItem(item) {
    return (
      <Card className={styles.card} key={item.namNumber}>
        <CardTitle title={item.namNumber} />
        <CardText>
          <div>{item.building}</div>
          <div>{item.room}</div>
          <div>{item.vlan}</div>
        </CardText>
      </Card>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.results.map(this.renderItem)}
      </div>
    );
  }
}
