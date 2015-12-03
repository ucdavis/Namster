//import $ from 'jquery';
import { SearchResultList } from './results';

export class SearchMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: props.query || '',
            results: props.results || []
        };
    }

    onChange(event) {
        this.setState({query: event.target.value});
    }
    onSubmit(event) {
        var self = this;
        var req = $.get('/search/query?term=' + self.state.query)
            .success(function(data) {
                self.setState({results: data});
            });
    }

    render() {
        var value = this.state.value;
        return (
          <div>
              <div className="form-group">
                  <label className="control=label" htmlFor="query">Search</label>
                  <input type="text" className="form-control" value={this.state.query} onChange={this.onChange.bind(this)} />
              </div>
              <button type="submit" className="btn btn-default" onClick={this.onSubmit.bind(this)}>Search</button>
            <hr/>
            <SearchResultList results={this.state.results} />
          </div>
        );
    }
}

ReactDOM.render(
  <SearchMain />,
  document.getElementById('search')
);
