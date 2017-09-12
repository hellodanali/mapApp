import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import App from './App';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { searchCity: '', error: false };
  }

  setCity(e) {
    e.preventDefault();
    this.setState({ searchCity: e.target.value });
  }

  getGeocode(e) {
    e.preventDefault();
    if (this.state.searchCity.length >= 2) {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { address: this.state.searchCity },
        (results, status) => {
          if (status == 'OK') {
            let city = results[0];
            console.log('*city:', city);
            let lat = city.geometry.location.lat();
            let lng = city.geometry.location.lng();
            console.log('Header:', lat, lng);
            this.setState({
              lat,
              lng,
              city: city.address_components[0].long_name,
              error: false
            });
          }
        }
      );
    } else {
      console.log('please enter a city');
      this.setState({ error: true });
    }
  }

  render() {
    return (
      <div name="top">
        <div className="header-text">
          <Link to="/">
            <p>Find Your Inner Zen</p>
            <p className="sub-header">In 2 Simple Steps</p>
          </Link>
        </div>
        <div className="sub-text">Find Your City</div>
        <div className="city-searchbar">
          <form onSubmit={e => this.getGeocode(e)}>
            <input
              onChange={e => this.setCity(e)}
              value={this.state.searchCity}
              onFocus={() => this.setState({ searchCity: '' })}
              placeholder="Find your city ..."
            />
            <button>
              <i className="fa fa-search fa-2x" />
            </button>
            {this.state.error &&
              <div className="error-message">please enter your city above</div>}
          </form>
        </div>
        {this.state.lat &&
          this.state.lng &&
          <App
            initialPosition={{
              lat: this.state.lat,
              lng: this.state.lng
            }}
            city={this.state.city}
          />}
      </div>
    );
  }
}

export default Header;
