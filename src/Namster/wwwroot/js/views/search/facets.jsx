import React from 'react'

import Checkbox from 'material-ui/lib/checkbox';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

export class FacetListItem extends React.Component {

  onCheck(event, checked) {
    if (this.props.onCheck){
      this.props.onCheck(this.props.value, checked)
    }
  }

  render() {
    return (
      <ListItem value={this.props.value}
        leftCheckbox={ <Checkbox value={this.props.value} checked={this.props.selected} onCheck={this.onCheck.bind(this)} /> }
        primaryText={ <span>{this.props.value} <span className="small">({this.props.count})</span></span> }
      />
    )
  }
}

export class FacetList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            building: this.props.building || '',
            department: this.props.department || '',
            vlan: this.props.vlan || ''
        };
    }

    onCheck(category, key, value) {
        this.props.onChange(category, key, value);

        var target = {};
        if (value){
          target[category] = key;
        }
        else {
          target[category] = false;
        }
        this.setState(target);
    }

    render() {
        var self = this;

        if (!this.props.facets) {
            return (<div></div>)
        }

        return (
            <div className="">
                <List subheader="Building" >
                    {this.props.facets.Building.Items.map(function(item) {
                        var selected = (self.state.building === item.Key);
                        return <FacetListItem key={item.Key} value={item.Key} count={item.DocCount} selected={selected} onCheck={self.onCheck.bind(self, "building")} />
                    })}
                </List>
                <Divider />
                <List subheader="Department">
                    {this.props.facets.Department.Items.map(function(item) {
                        var selected = (self.state.department === item.Key);
                        return <FacetListItem key={item.Key} value={item.Key} count={item.DocCount} selected={selected} onCheck={self.onCheck.bind(self, "department")} />
                    })}
                </List>
                <Divider />
                <List subheader="VLAN">
                    {this.props.facets.VLAN.Items.map(function(item) {
                        var selected = (self.state.vlan === item.Key);
                        return <FacetListItem key={item.Key} value={item.Key} count={item.DocCount} selected={selected} onCheck={self.onCheck.bind(self, "vlan")} />
                    })}
                </List>
            </div>
        )
    }
}
