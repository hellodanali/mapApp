import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Banner extends Component {
  render() {
    return (
      <div className="header-text">
        <Link to="/">
          <p>Find Your Inner Zen</p>
          <p className="sub-header">In Two Simple Steps</p>
        </Link>
      </div>
    );
  }
}

export default Banner;
