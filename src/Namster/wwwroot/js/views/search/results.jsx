export class SearchResult extends React.Component {
    render() {
        return (
            <div className="result">
              <a href="/nam/{this.props.result.}">
                  <h2>{this.props.result.NamNumber}</h2>
                  <p>
                    Building: {this.props.result.Building}<br/>
                    Room: {this.props.result.Room}<br/>
                    Department: {this.props.result.Department}<br/>
                    VLAN: {this.props.result.Vlan}
                  </p>
              </a>
            </div>
        )
    }
}

export class SearchResultList extends React.Component {
    render() {
        return (
          <div className="panel">
              <div className="panel-header">
                  Results - {this.props.results.length}
              </div>
              <div className="panel-body">
                <div className="row">
                  {this.props.results.map(function(result) {
                     return (
                        <SearchResult key={result.NamNumber} result={result} />
                     )
                  })}
                </div>
              </div>
          </div>
        )
    }
}
