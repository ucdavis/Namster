import React from 'react'

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export class SearchResult extends React.Component {
    render() {
        var building = null;
        if (this.props.result.Building) {
            building = <ListItem primaryText={this.props.result.Building} leftIcon={<i className="material-icons">account_balance</i>} />;
        }

        var room = null;
        if (this.props.result.Room) {
            room = <ListItem primaryText={this.props.result.Room} leftIcon={<i className="material-icons">hotel</i>} />;
        }

        var department = null;
        if (this.props.result.Department) {
            department = <ListItem primaryText={this.props.result.Department} leftIcon={<i className="material-icons">group</i>} />;
        }

        var vlan = null;
        if (this.props.result.Vlan) {
            vlan = <ListItem primaryText={this.props.result.Vlan} leftIcon={<i className="material-icons">router</i>} />;
        }

        return (
            <div className="result mdl-color--white mdl-shadow--4dp mdl-card mdl-color-text--grey-800 mdl-cell mdl-cell--4-col">
              <div className="mdl-card__title">
                <h3 className="mdl-card__title-text"><i className="material-icons">settings_input_hdmi</i>{this.props.result.NamNumber}</h3>
              </div>
              <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                <List>
                  {building}
                  {room}
                  {department}
                  {vlan}
                </List>
              </div>
            </div>
        )
    }
}

export class SearchResultList extends React.Component {
    render() {
        return (
            <div className="mdl-grid">
              {this.props.results.map(function(result) {
                 return (
                    <SearchResult key={result.NamNumber} result={result} />
                 )
              })}
            </div>
        )
    }
}
