export class SearchResult extends React.Component {
    render() {
        return (
            <a href="/nam/{this.props.result.}">
              <div className="panel panel-default">
                <div className="panel-body">
                  <h2>{this.props.result.NamNumber}</h2>
                  <p>This is where more information goes.</p>
                </div>
              </div>
            </a>
        )
    }
}

export class SearchResultList extends React.Component {
    render() {
        return (
            <div>
              {this.props.results.map(function(result) {
                 return <SearchResult key={result.NamNumber} result={result} />;
              })}
            </div>
        )
    }
}
