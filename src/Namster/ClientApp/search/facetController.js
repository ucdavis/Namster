import React from 'react';

import Facet from './facet';

import styles from './facetController.scss';

export default class FacetController extends React.Component {

  _onChange = (category, value) => {
    if (this.props.onChange) {
      this.props.onChange(category, value);
    }
  }

  render() {
    const { facets, selected } = this.props;

    let buildings = null;
    if (facets.building && facets.building.items && facets.building.items.length) {
      buildings = (
        <div className={styles.facet}>
          <Facet
            header="Building"
            items={facets.building.items}
            selectedKey={selected.building}
            onChange={(value) => this._onChange('building', value)}
          />
        </div>
      );
    }

    let departments = null;
    if (facets.department && facets.department.items && facets.department.items.length) {
      departments = (
        <div className={styles.facet}>
          <Facet
            header="Department"
            items={facets.department.items}
            selectedKey={selected.department}
            onChange={(value) => this._onChange('department', value)}
          />
        </div>
      );
    }

    let vlans = null;
    if (facets.vlan && facets.vlan.items && facets.vlan.items.length) {
      vlans = (
        <div className={styles.facet}>
          <Facet
            header="VLAN"
            items={facets.vlan.items}
            selectedKey={selected.vlan}
            onChange={(value) => this._onChange('vlan', value)}
          />
        </div>
      );
    }

    return (
      <div className="">
        { buildings }
        { departments }
        { vlans }
      </div>
    );
  }
}
