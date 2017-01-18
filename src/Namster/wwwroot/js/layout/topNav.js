import React from 'react';

export class TopNav extends React.Component {

  constructor(props) {
    super(props);

        // set random placeholder
    const placeholders = ['Find the perfect NAM for you', 'What would you like to NAM today?', 'Your ideal NAM is waiting for you...'];
    this._searchPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];
  }

  _onSearchFocus = (event) => {
    if (this.props.onSearchFocus) {
      this.props.onSearchFocus(event);
    }
  }

  _onSearchChange = (event) => {
    if (this.props.onSearchChange) {
      this.props.onSearchChange(event);
    }
  }

  render() {
    return (
      <nav id="top-nav" className="navbar navbar-dark bg-inverse">
        <a className="navbar-brand" href="/">NamstR</a>
        <form className="form-inline pull-xs-right navbar-search-form">
          <input
            className="form-control navbar-search-input" type="text" placeholder={this._searchPlaceholder}
            value={this.props.terms}
            onFocus={this._onSearchFocus}
            onChange={this._onSearchChange}
          />
        </form>
      </nav>
    );
  }
}
