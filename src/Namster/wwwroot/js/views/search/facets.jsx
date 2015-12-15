import React from 'react'

import Checkbox from 'material-ui/lib/checkbox';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';

var SelectableList = SelectableContainerEnhance(List);

export class FacetListItem extends React.Component {

  onCheck(event, checked) {
    if (this.props.onCheck){
      this.props.onCheck(this.props.value, checked)
    }

    this.setState({switched: true})
  }

  render() {
    return (
      <ListItem value={this.props.value}
        leftCheckbox={ <Checkbox value={this.props.value} onCheck={this.onCheck.bind(this)} /> }
        primaryText={ <span>{this.props.value} <span className="small">({this.props.count})</span></span> }
      />
    )
  }
}

export class FacetList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buildings: this.props.buildings || [],
            departments: this.props.departments || [],
            vlans: this.props.vlans || []
        }
    }

    onCheck(category, key, value) {
        this.props.onChange(category, key, value);
    }

    handleUpdateSelectedIndex(e,index) {
    }

    render() {
        var self = this;

        if (!this.props.facets) {
            return (<div></div>)
        }

        return (
            <div className="">
                <SelectableList subheader="Building" valueLink={{value:this.state.buildings, requestChange:this.handleUpdateSelectedIndex.bind(this)}}>
                    {this.props.facets.Building.Items.map(function(item) {
                        return <FacetListItem key={item.Key} value={item.Key} count={item.DocCount} onCheck={self.onCheck.bind(self, "building")} />
                    })}
                </SelectableList>
                <Divider />
                <SelectableList subheader="Department" valueLink={{value:this.state.departments, requestChange:this.handleUpdateSelectedIndex.bind(this)}}>
                    {this.props.facets.Department.Items.map(function(item) {
                        return <FacetListItem key={item.Key} value={item.Key} count={item.DocCount} onCheck={self.onCheck.bind(self, "department")} />
                    })}
                </SelectableList>
                <Divider />
                <SelectableList subheader="VLAN" valueLink={{value:this.state.vlans, requestChange:this.handleUpdateSelectedIndex.bind(this)}}>
                    {this.props.facets.VLAN.Items.map(function(item) {
                        return <FacetListItem key={item.Key} value={item.Key} count={item.DocCount} onCheck={self.onCheck.bind(self, "vlan")} />
                    })}
                </SelectableList>
            </div>
        )
    }
}
