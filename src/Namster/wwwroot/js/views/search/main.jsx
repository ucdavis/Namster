//import $ from 'jquery';
import { SearchResultList } from './results.jsx';
import { SearchInProgress } from './components.jsx'

export class SearchMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: props.query || '',
            results: props.results || []
        };

        this._searchTimer = 0;
    }

    onChange(event) {
        this.setState({query: event.target.value});
        this.setState({searching: !!event.target.value});

        // cancel existing request
        if (this._request) {
            this._request.abort();
        }

        // check if we should start a new one
        if (!!event.target.value && event.target.value.length > 2) {
            this._resetSearch();
        }
    }

    // delay start search by 500 ms
    _resetSearch() {
        clearTimeout (this._searchTimer);
        this._searchTimer = setTimeout(this._startSearch.bind(this), 500);
    }

    _startSearch() {
        var self = this;
        self._request = $.get('/search/query?term=' + self.state.query)
            .success(function(data) {
                self.setState({results: data});
            });
    }

    render() {
        var value = this.state.value;

        var content = <SearchInProgress />;
        if (this.state.results){
            content =  <SearchResultList results={this.state.results} />;
        }

        return (
          <div>
              <div className="form-group">
                  <label className="control=label" htmlFor="query">Search</label>
                  <input type="text" className="form-control" value={this.state.query} onChange={this.onChange.bind(this)} />
              </div>
            <hr/>
            {content}
          </div>
        );
    }
}

ReactDOM.render(
  <SearchMain />,
  document.getElementById('search')
);
