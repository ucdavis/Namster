import React from 'react'

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export class SearchResult extends React.Component {
    render() {
        var innerDivStyle = {
          paddingLeft: "4rem"
        };

        var building = null;
        if (this.props.result.Building) {
            building = <ListItem primaryText={this.props.result.Building} leftIcon={<i className="material-icons">account_balance</i>} innerDivStyle={innerDivStyle} />;
        }

        var room = null;
        if (this.props.result.Room) {
            room = <ListItem primaryText={this.props.result.Room} leftIcon={<i className="material-icons">hotel</i>} innerDivStyle={innerDivStyle} />;
        }

        var department = null;
        if (this.props.result.Department) {
            department = <ListItem primaryText={this.props.result.Department} leftIcon={<i className="material-icons">group</i>} innerDivStyle={innerDivStyle} />;
        }

        var vlan = null;
        if (this.props.result.Vlan) {
            vlan = <ListItem primaryText={this.props.result.Vlan} leftIcon={<i className="material-icons">router</i>} innerDivStyle={innerDivStyle} />;
        }

        return (
            <div className="result col-sm-4">
              <div className="card">
                <h4 className="card-header" style={{position: "relative"}}>
                  <i className="material-icons" style={{position: "absolute"}}>settings_input_hdmi</i>
                  <span style={{paddingLeft: "2rem"}}>{this.props.result.NamNumber}</span></h4>
                <div className="card-block">
                  <List>
                    {building}
                    {room}
                    {department}
                    {vlan}
                  </List>
                </div>
              </div>
            </div>
        )
    }
}

export class SearchResultList extends React.Component {
    render() {
        return (
            <div className="row">
              {this.props.results.map(function(result) {
                 return (
                    <SearchResult key={result.NamNumber} result={result} />
                 )
              })}
            </div>
        )
    }
}
