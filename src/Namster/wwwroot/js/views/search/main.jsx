//import $ from 'jquery';
//import { Router, Route, Link } from 'react-router'

import { SearchResultList } from './results.jsx';
import { SearchInProgress } from './components.jsx'
import { FacetList } from './facets.jsx'

import { getParameterByName } from '../../functions/location'

export class SearchMain extends React.Component {
    constructor(props) {
        super(props);

        // check url
        var term = getParameterByName('term');

        this.state = {
            query: props.query || term || '',
            results: props.results || []
        };

        this._searchTimer = 0;

        if (this.state.query){
          this.state.searching = true;
          this._resetSearch();
        }
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
            this.setState({searching: true});
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
                self.setState({results: data.results});
                self.setState({aggregates: data.aggregates});
                window.history.pushState({"query":data},"Search Results", "/search/?term=" + self.state.query);
            })
            .done(function() {
                self.setState({searching: false});
            });
    }

    render() {
        var content = null;
        var facets = null;
        if (this.state.searching) {
            content = <SearchInProgress />;
        }
        else if (this.state.results) {
            content =  <SearchResultList results={this.state.results} />;
            facets = <FacetList facets={this.state.aggregates} />;
        }
        else {
            content = <div></div>;
        }

        return (
          <div>
            <div className="input-group" id="search-box">
              <span className="input-group-btn">
                <button className="btn btn-default" type="button"><i className="fa fa-search"></i></button>
              </span>
              <input type="text" className="form-control" value={this.state.query} onChange={this.onChange.bind(this)} />
            </div>
            <div className="results-container mdl-grid">
              <div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone">
                  {facets}
              </div>
              <div className="mdl-cell mdl-cell--8-col">
                  {content}
              </div>
            </div>
          </div>
        );
    }
}

ReactDOM.render(
  <SearchMain />,
  document.getElementById('search')
);
