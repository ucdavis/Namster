import React from 'react';

import Facet from './facet';

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
        <Facet
          subHeader="Building"
          items={facets.building.items}
          selectedKey={selected.building}
          onChange={(value) => this._onChange('building', value)}
        />
      );
    }

    let departments = null;
    if (facets.department && facets.department.items && facets.department.items.length) {
      departments = (
        <Facet
          subHeader="Department"
          items={facets.department.items}
          selectedKey={selected.department}
          onChange={(value) => this._onChange('department', value)}
        />
      );
    }

    let vlans = null;
    if (facets.vlan && facets.vlan.items && facets.vlan.items.length) {
      vlans = (
        <Facet
          subHeader="VLAN"
          items={facets.vlan.items}
          selectedKey={selected.vlan}
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
