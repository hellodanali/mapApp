import React, { Component } from 'react';

import Main from './Main';
import Banner from './Banner';

class CitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = { searchCity: '', error: false };
  }

  // set city string in local state
  setCity(e) {
    e.preventDefault();
    this.setState({ searchCity: e.target.value });
  }

  // get geocode for set city on submit
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
        <Banner />
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
          <Main
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

export default CitySearch;
