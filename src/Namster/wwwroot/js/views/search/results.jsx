export class SearchResult extends React.Component {
    render() {
        var building = null;
        if (this.props.result.Building) {
          building = <span>Building:  {this.props.result.Building}<br/></span>;
        }

        var room = null;
        if (this.props.result.Room) {
          room = <span>Room: {this.props.result.Room}<br/></span>
        }

        var department = null;
        if (this.props.result.Department) {
          department = <span>Department: {this.props.result.Department}<br/></span>
        }

        var vlan = null;
        if (this.props.result.Vlan) {
          vlan = <span>VLAN: {this.props.result.Vlan}<br/></span>
        }

        return (
            <div className="result mdl-color--white mdl-shadow--4dp mdl-card mdl-color-text--grey-800 mdl-cell mdl-cell--4-col">
              <div className="mdl-card__title">
                <h3 className="mdl-card__title-text"><i className="material-icons">settings_input_hdmi</i>{this.props.result.NamNumber}</h3>
              </div>
              <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                <p>
                  {building}
                  {room}
                  {department}
                  {vlan}
                </p>
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
