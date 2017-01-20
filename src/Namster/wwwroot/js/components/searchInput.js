import React from 'react';
import { withRouter } from 'react-router';

import styles from './searchInput.scss';

const searchInput = class SearchInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      placeholder: this.getRandomPlaceholder()
    };
  }

  _placeholders = [
    'Find the perfect NAM for you',
    'What would you like to NAM today?',
    'Your ideal NAM is waiting for you...'
  ];

  getRandomPlaceholder = () => (
    this._placeholders[Math.floor(Math.random() * this._placeholders.length)] || ''
  )

  _handleFocus = (event) => {
    this.setState({
      placeholder: ''
    });
  }

  _handleBlur = (event) => {
    this.setState({
      placeholder: this.getRandomPlaceholder()
    });
  }

  _handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  _onSubmit = (event) => {
    event.preventDefault();

    this.props.router.push('/search', {
      query: this.state.value
    });
  }

  render() {
    return (
      <form className="" onSubmit={this._onSubmit}>
        <input
          className={styles.input} type="text"
          placeholder={this.state.placeholder}
          value={this.state.value}
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          onChange={this._handleChange}
        />
      </form>
    );
  }
};

export default withRouter(searchInput);
