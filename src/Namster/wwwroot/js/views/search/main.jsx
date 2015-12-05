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
        // clear out results, update state
        this.setState({results: null});
        this.setState({query: event.target.value});

        // cancel any existing request
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
        this.setState({searching: true});
        this._searchTimer = setTimeout(this._startSearch.bind(this), 500);
    }

    _startSearch() {
        var self = this;
        self._request = $.get('/search/query?term=' + self.state.query)
            .success(function(data) {
                self.setState({results: data});
            })
            .done(function() {
                self.setState({searching: false});
            });
    }

    render() {
        var value = this.state.value;

        var content = null;
        if (this.state.searching) {
            content = <SearchInProgress />;
        }
        else if (this.state.results) {
            content =  <SearchResultList results={this.state.results} />;
        }
        else {
            // content = <NoResults />;
        }

        return (
          <div>
              <div className="input-group" id="search-box">
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button"><i className="fa fa-search"></i></button>
                </span>
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
