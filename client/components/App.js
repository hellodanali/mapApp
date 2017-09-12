import React, { Component } from 'react';

import PlaceDetails from './PlaceDetails';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: '', searchResults: [] };
  }

  componentDidMount() {
    const { lat, lng } = this.props.initialPosition;
    lat && lng && this.renderMap(lat, lng);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.initialPosition.lat !== this.props.initialPosition.lat ||
      prevProps.initialPosition.lng !== this.props.initialPosition.lng
    ) {
      const { lat, lng } = this.props.initialPosition;
      console.log('new position:', lat, lng);
      this.clearSearchResults();
      this.renderMap(lat, lng);
    }
  }
  clearSearchResults() {
    this.setState({ searchResults: [] });
  }

  sendQuery(e, term) {
    e.preventDefault();
    let searchTerm = term;
    if (!searchTerm.length) {
      return;
    }
    // console.log('* searching for: ', searchTerm);
    const { lat, lng } = this.props.initialPosition;
    console.log(lat, lng);
    let location = new google.maps.LatLng(lat, lng);
    let map = new google.maps.Map(this.refs.map, {
      center: location,
      zoom: 15
    });

    let request = {
      location: location,
      rankBy: 'DISTANCE',
      query: searchTerm
    };

    let service = new google.maps.places.PlacesService(map);
    let bounds = map.getBounds();
    let nearbyResults = [];

    service.textSearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          let place = results[i];

          nearbyResults.push(place);
          let lat = place.geometry.location.lat();
          let lng = place.geometry.location.lng();

          let marker = new google.maps.Marker({
            position: { lat, lng },
            map: map
          });

          this.addInfoWindow(place.name, map, marker);

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        }
      }
      map.fitBounds(bounds);
      this.setState({ searchResults: nearbyResults.slice() });
    });
  }

  addInfoWindow(content, map, marker) {
    let infoWindow = new google.maps.InfoWindow({ content });

    marker.addListener('mouseover', () => {
      infoWindow.open(map, marker);
    });

    marker.addListener('mouseout', () => {
      infoWindow.close();
    });
  }

  getPlaceDetails(placeId) {
    const { lat, lng } = this.props.initialPosition;

    let location = new google.maps.LatLng(lat, lng);
    let map = new google.maps.Map(this.refs.map, {
      center: location,
      zoom: 15
    });

    let request = { placeId };

    let service = new google.maps.places.PlacesService(map);

    service.getDetails(request, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        let lat = place.geometry.location.lat();
        let lng = place.geometry.location.lng();
        let marker = new google.maps.Marker({
          position: { lat, lng },
          map: map
        });
        this.addInfoWindow(place.name, map, marker);
        map.setCenter({ lat, lng });
      }
    });
  }

  setSearchTerm(e) {
    e.preventDefault();
    this.setState({ searchTerm: e.target.value });
  }

  renderMap(lat, lng) {
    let location = new google.maps.LatLng(lat, lng);
    let map = new google.maps.Map(this.refs.map, {
      center: location,
      zoom: 13
    });
    new google.maps.Marker({ position: { lat, lng }, map: map });
  }

  render() {
    return (
      <div id="resultmap">
        {/*
          <form onSubmit={e => this.sendQuery(e, 'yoga')}>
            <input
              ref="searchBox"
              onChange={e => this.setSearchTerm(e)}
              value={this.state.searchTerm}
              onFocus={() => this.setState({ searchTerm: '' })}
            />
            <button>search</button>
          </form>*/}
        <div className="practice-search">
          <div className="sub-text">Choose Your Practice</div>
          <div className="sorting-btn">
            <button
              className="yoga-btn"
              onClick={e => {
                this.sendQuery(e, 'yoga');
              }}
            >
              Yoga
            </button>
            <button
              className="meditation-btn"
              onClick={e => {
                this.sendQuery(e, 'meditation');
              }}
            >
              Meditation
            </button>
          </div>

          <div className="map" ref="map" />
        </div>

        <div className="query-results">
          {this.state.searchResults.map(place => {
            return (
              <div
                key={place.id}
                onClick={() => {
                  this.getPlaceDetails(place.place_id);
                }}
              >
                <a href="#resultmap">
                  <PlaceDetails place={place} />
                </a>
              </div>
            );
          })}
        </div>
        {this.state.searchResults.length >= 5 &&
          <div className="back-to-top-btn">
            <a href="#top">Back to Top</a>
          </div>}
      </div>
    );
  }
}

export default App;
