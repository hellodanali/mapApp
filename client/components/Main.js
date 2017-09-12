import React, { Component } from 'react';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = { search_term: '', searchResults: [], query: 'restaurant' };
    this.setSearchResults = this.setSearchResults.bind(this);
  }
  componentDidMount() {
    this.renderMap();
  }

  renderMap() {
    const { lat, lng } = this.props.initialPosition;
    const map = new google.maps.Map(this.refs.map, {
      center: { lat, lng },
      zoom: 13
    });

    // new google.maps.Marker({ position: { lat, lng }, map: map });
    const input = this.refs.searchBox;
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    this.changeLocation(map, searchBox);
  }

  changeLocation(map, searchBox) {
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', () => {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];
      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log('Returned place contains no geometry');
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map: map,
            // icon: icon,
            title: place.name,
            position: place.geometry.location
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
    });
  }

  setSearchResults(results) {
    this.setState({ searchResults: results });
  }

  render() {
    return (
      <div style={{ margin: '1rem' }}>
        Map
        <div>
          <input
            ref="searchBox"
            type="search"
            // onChange={e => this.setSearchTerm(e.target.value)}
          />
        </div>
        <div
          ref="map"
          style={{
            width: 500,
            height: 500,
            border: '1px solid grey'
          }}
        />
        {this.state.searchResults.map((place, index) => {
          return <div key={index}>place.name</div>;
        })}
      </div>
    );
  }
}

export default Main;
