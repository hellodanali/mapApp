import React, { Component } from 'react';

class PlaceDetails extends Component {
  render() {
    const { place } = this.props;
    return (
      <div className="place-detail">
        <div className="card-grid">
          <div>
            {place.photos
              ? <img
                  className="place-photo"
                  src={`${place.photos[0].getUrl({
                    maxHeight: 100,
                    maxWidth: 100
                  })}`}
                />
              : <img className="place-holder" />}
          </div>
          <div>
            <div className="card-grid">
              <div className="place-name">
                {place.name}
              </div>
            </div>
            <div className="card-grid">
              {place.rating
                ? <div className="rating">
                    <i className="fa fa-star" />
                    {place.rating}
                  </div>
                : null}
              <div>
                {place.opening_hours && place.opening_hours.open_now
                  ? <span className="open-now">Open Now</span>
                  : <span>Closed</span>}
              </div>
            </div>

            <div className="card-grid">
              <div>
                {place.formatted_address}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaceDetails;
