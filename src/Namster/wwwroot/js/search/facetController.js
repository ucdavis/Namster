import React from 'react';

import Facet from './facet';

export default class FacetController extends React.Component {

  _onChange = (category, value) => {
    if (this.props.onChange) {
      this.props.onChange(category, value);
    }
  }

  render() {
    const { facets } = this.props;

    let buildings = null;
    if (facets.building && facets.building.items && facets.building.items.length) {
      buildings = (
        <Facet
          subheader="Building"
          items={facets.building.items}
          onChange={(value) => this._onChange('building', value)}
        />
      );
    }

    let departments = null;
    if (facets.department && facets.department.items && facets.department.items.length) {
      departments = (
        <Facet
          subheader="Department"
          items={facets.department.items}
          onChange={(value) => this._onChange('department', value)}
        />
      );
    }

    let vlans = null;
    if (facets.vlan && facets.vlan.items && facets.vlan.items.length) {
      vlans = (
        <Facet
          subheader="VLAN"
          items={facets.vlan.items}
          onChange={(value) => this._onChange('vlan', value)}
        />
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
