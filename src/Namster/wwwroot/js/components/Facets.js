import React from 'react'

import Checkbox from 'material-ui/lib/checkbox';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

export class FacetListItem extends React.Component {

  constructor(props) {
      super(props)

      this.onCheck = this._onCheck.bind(this)
  }

  _onCheck(event, checked) {
    if (this.props.onCheck){
      this.props.onCheck(this.props.value, checked)
    }
  }

  render() {
    return (
      <ListItem value={this.props.value}
        leftCheckbox={ <Checkbox value={this.props.value} checked={this.props.selected} onCheck={this.onCheck} /> }
        primaryText={ <span>{this.props.value} <span className="small">({this.props.count})</span></span> }
      />
    )
  }
}

export class FacetList extends React.Component {
    constructor(props) {
        super(props);

        this.onCheck = this._onCheck.bind(this);
    }

    _onCheck(category, key, value) {
        this.props.onChange(category, key, value);
    }

    render() {
        const { facets, filters } = this.props
        var self = this;

        if (!facets) {
            return (<div></div>)
        }

        var buildings = null;
        if (facets.Building && facets.Building.Items && facets.Building.Items.length) {
            buildings =
              <List subheader="Building" >
                  {facets.Building.Items.map(function(item) {
                      var selected = (filters.building === item.Key);
                      return <FacetListItem key={item.Key} value={item.Key} count={item.DocCount} selected={selected} onCheck={self.onCheck.bind(self, "building")} />
                  })}
              </List>
        }

        var departments = null;
        if (facets.Departments && facets.Departments.Items && facets.Departments.Items.length) {
            departments =
              <List subheader="Department" >
                  {facets.Departments.Items.map(function(item) {
                      var selected = (filters.department === item.Key);
                      return <FacetListItem key={item.Key} value={item.Key} count={item.DocCount} selected={selected} onCheck={self.onCheck.bind(self, "department")} />
                  })}
              </List>
        }

        var vlans = null;
        if (facets.Vlan && facets.Vlan.Items && facets.Vlan.Items.length) {
            vlans =
              <List subheader="VLAN" >
                  {facets.Vlan.Items.map(function(item) {
                      var selected = (filters.vlan === item.Key);
                      return <FacetListItem key={item.Key} value={item.Key} count={item.DocCount} selected={selected} onCheck={self.onCheck.bind(self, "vlan")} />
                  })}
              </List>
        }

        return (
            <div className="">
                { buildings }
                <Divider />
                { departments }
                <Divider />
                { vlans }
            </div>
        )
    }
}
