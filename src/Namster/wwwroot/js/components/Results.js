import React from 'react'
import { Link } from 'react-router'

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export class SearchResult extends React.Component {
    render() {
        var innerDivStyle = {
          paddingLeft: "4rem"
        };

        var building = null;
        if (this.props.result.building) {
            var buildingUrl = '/list?building=' + encodeURIComponent(this.props.result.building)
            var buildingLink = <Link to={buildingUrl} />
            building = <ListItem containerElement={buildingLink} innerDivStyle={innerDivStyle}
              primaryText={this.props.result.building} leftIcon={<i className="material-icons">account_balance</i>} />
        }

        var room = null;
        if (this.props.result.room) {
            var roomUrl = '/list?building=' + encodeURIComponent(this.props.result.building) + '&room=' + encodeURIComponent(this.props.result.room)
            var roomLink = <Link to={roomUrl} />
            room = <ListItem containerElement={roomLink} innerDivStyle={innerDivStyle}
              primaryText={this.props.result.room} leftIcon={<i className="material-icons">hotel</i>} />
        }

        var department = null;
        if (this.props.result.department) {
            var departmentUrl = '/list?department=' + encodeURIComponent(this.props.result.department)
            var departmentLink = <Link to={departmentUrl} />
            department = <ListItem containerElement={departmentLink} innerDivStyle={innerDivStyle}
              primaryText={this.props.result.department} leftIcon={<i className="material-icons">group</i>} />
        }

        var vlan = null;
        if (this.props.result.vlan) {
            var vlanUrl = '/list?vlan=' + encodeURIComponent(this.props.result.vlan)
            var vlanLink = <Link to={vlanUrl} />
            vlan = <ListItem containerElement={vlanLink} innerDivStyle={innerDivStyle}
              primaryText={this.props.result.vlan} leftIcon={<i className="material-icons">router</i>} />
        }

        return (
            <div className="result col-sm-6">
              <div className="card">
                <h4 className="card-header" style={{position: "relative"}}>
                  <i className="material-icons" style={{position: "absolute"}}>settings_input_hdmi</i>
                  <span style={{paddingLeft: "2rem"}}>{this.props.result.namNumber}</span></h4>
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
