import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import styles from './input.scss';

class Input extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || '',
      placeholder: this.getRandomPlaceholder()
    };
  }

  getRandomPlaceholder = () => (
    this._placeholders[Math.floor(Math.random() * this._placeholders.length)] || ''
  )

  _placeholders = [
    'Find the perfect NAM for you',
    'What would you like to NAM today?',
    'Your ideal NAM is waiting for you...'
  ];

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

    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  }

  render() {
    const { value: stateValue, placeholder } = this.state;
    return (
      <form className={styles.form} onSubmit={this._onSubmit}>
        <input
                className={styles.input} type="text"
                placeholder={placeholder}
                value={stateValue}
                onFocus={this._handleFocus}
                onBlur={this._handleBlur}
                onChange={this._handleChange}
                />
      </form>
    );
  }
}

export default withRouter(connect(null)(Input));
