//import $ from 'jquery';
import React from 'react'
import ReactDOM from 'react-dom'

import LinearProgress from 'material-ui/lib/linear-progress'
import CircularProgress from 'material-ui/lib/circular-progress'

import { SearchResultList } from './results.jsx';
import { FacetList } from './facets.jsx'

import { getParameterByName } from '../../functions/location'

export class SearchMain extends React.Component {
    constructor(props) {
        super(props);

        // check url
        var term = getParameterByName('term');
        var building = getParameterByName('building');
        var department = getParameterByName('department');
        var vlan = getParameterByName('vlan');

        this.state = {
            query: props.query || term || '',
            building: props.building || building || '',
            department: props.department || department || '',
            vlan: props.vlan || vlan || '',
            results: props.results || []
        };

        this._searchTimer = 0;

        if (this.state.query){
          this.state.searching = true;
          this._resetSearch();
        }
    }

    onQueryChange(event) {
        // clear out results, update state
        this.setState({results: null});
        this.setState({query: event.target.value});

        // clear out filtering
        this.setState({
          building: false,
          department: false,
          vlan: false
        })

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

    onFacetSelect(category, key, value) {
        var target = {};

        if (value){
            target[category] = key;
        }
        else {
            target[category] = false;
        }

        this.setState(target)
        this.setState({searching: true});
        this._resetSearch();
    }

    // delay start search by 500 ms
    _resetSearch() {
        clearTimeout (this._searchTimer);
        this._searchTimer = setTimeout(this._startSearch.bind(this), 500);
    }

    _startSearch() {
        var self = this;
        var terms = 'term=' + encodeURIComponent(self.state.query);

        if (self.state.building) {
            terms += '&building=' + encodeURIComponent(self.state.building);
        }

        if (self.state.department) {
            terms += '&department=' + encodeURIComponent(self.state.department);
        }

        if (self.state.vlan) {
            terms += '&vlan=' + encodeURIComponent(self.state.vlan);
        }

        self._request = $.get('/search/query?' + terms)
            .success(function(data) {
                self.setState({results: data.results});
                self.setState({aggregates: data.aggregates});
                window.history.pushState({"query":data},"Search Results", '?' + terms);
            })
            .done(function() {
                self.setState({searching: false});
            });
    }

    render() {
        var content = null;
        if (this.state.searching) {
            content = <CircularProgress mode="indeterminate" size={4} />;
        }
        else if (this.state.results) {
            content =  <SearchResultList results={this.state.results} />;
        }
        else {
            content = <div></div>;
        }

        return (
          <div>
            <div id="search-wrapper" className="search-wrapper">
              <div className="input-holder">
                  <input id="searchbox" type="text" className="search-input" placeholder="" value={this.state.query} onChange={this.onQueryChange.bind(this)} />
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                    <FacetList facets={this.state.aggregates} onChange={this.onFacetSelect.bind(this)}
                        building={this.state.building} department={this.state.department} vlan={this.state.vlan}
                       />
                </div>
                <div className="col-md-9">
                    {content}
                </div>
              </div>
            </div>
          </div>
        );
    }
}
