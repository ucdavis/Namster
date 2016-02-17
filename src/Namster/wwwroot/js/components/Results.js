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
            var buildingUrl = './list?building=' + encodeURIComponent(this.props.result.Building);
            building = <ListItem href={buildingUrl} innerDivStyle={innerDivStyle}
              primaryText={this.props.result.Building} leftIcon={<i className="material-icons">account_balance</i>} />;
        }

        var room = null;
        if (this.props.result.Room) {
          var roomUrl = './list?building=' + encodeURIComponent(this.props.result.Building) + '&room=' + encodeURIComponent(this.props.result.Room);
            room = <ListItem href={roomUrl} innerDivStyle={innerDivStyle}
              primaryText={this.props.result.Room} leftIcon={<i className="material-icons">hotel</i>} />;
        }

        var department = null;
        if (this.props.result.Department) {
          var departmentUrl = './list?department=' + encodeURIComponent(this.props.result.Department);
            department = <ListItem href={departmentUrl} innerDivStyle={innerDivStyle}
              primaryText={this.props.result.Department} leftIcon={<i className="material-icons">group</i>} />;
        }

        var vlan = null;
        if (this.props.result.Vlan) {
          var vlanUrl = './list?vlan=' + encodeURIComponent(this.props.result.Vlan);
            vlan = <ListItem href={vlanUrl} innerDivStyle={innerDivStyle}
              primaryText={this.props.result.Vlan} leftIcon={<i className="material-icons">router</i>} />;
        }

        return (
            <div className="result col-sm-6">
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
