import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const searchItem = this.state.query.trim();
    if (!searchItem) {
      alert('Hooray! You found a void...');
    }
    this.props.onSubmit(searchItem);
    this.setState({ query: '' });
  };

  handleChange = evt => {
    this.setState({ query: evt.target.value });
  };

  render() {
    return (
      <header>
        <form onSubmit={this.handleSubmit}>
          <button type='submit'>
            <span>Search</span>
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
            name="query"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;