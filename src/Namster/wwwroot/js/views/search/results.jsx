export class SearchResult extends React.Component {
    render() {
        return (
            <li>{this.props.result.NamNumber}</li>
        )
    }
}

export class SearchResultList extends React.Component {
    render() {
        return (
            <ul>
              {this.props.results.map(function(result) {
                 return <SearchResult key={result.NamNumber} result={result} />;
              })}
            </ul>
        )
    }
}
