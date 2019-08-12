import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

// examples:
import GoogleMap from '../components/GoogleMap';

// consts: [34.0522, -118.2437]
import LOS_ANGELES_CENTER from '../const/la_center';

const getInfoWindowString = place => `
    <div>
      <div style="font-size: 16px;">
        ${place.formatted_address}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${place.rating}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(place.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}</span>
      </div>
      <div style="font-size: 14px; color: grey;">
        haha
      </div>
      <div style="font-size: 14px; color: grey;">
        ${'$'.repeat(place.price_level)}
      </div>
      <div style="font-size: 14px; color: green;">
        ${'Open.......'}
      </div>
    </div>`;

// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
const handleApiLoaded = (map, maps, places) => {
		var places = [
		{
			"formatted_address": "3655 S Grand Ave, Los Angeles, CA 90007, USA",
			"geometry": {
				"location": {
					"lat": 34.017339,
					"lng": -118.278469
				},
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",			
			"rating": 4
		},
		{
			"formatted_address": "3655 S Grand Ave, Los Angeles, CA 90007, USA",
			"geometry": {
				"location": {
					"lat": 34.0771192,
					"lng": -118.2587199
				},
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",	
			"rating": 4		
		},
		{
			"formatted_address": "3655 S Grand Ave, Los Angeles, CA 90007, USA",
			"geometry": {
				"location": {
					"lat": 34.083527,
					"lng": -118.370157
				},
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",			
			"rating": 3.5
		},
		]


	// console.log(map, 1)
	// console.log(maps, 12)
	// console.log(places, 13)
  const markers = [];
  const infowindows = [];

  places.forEach((place) => {
    markers.push(new maps.Marker({
      position: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,        
      },
      map,
      icon: 'http://www.gg-sems.kr/template/images/icon_solar_0.png'
    }));

    infowindows.push(new maps.InfoWindow({
      content: getInfoWindowString(place),
    }));

  });

  markers.forEach((marker, i) => {
    marker.addListener('click', () => {
      infowindows[i].open(map, marker);
    });
  });
};

class MarkerInfoWindowGmapsObj extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    fetch('places.json')
      .then(response => response.json())
      .then((data) => {
        data.results.forEach((result) => {
        	console.log(result, 77)
          result.show = true; // eslint-disable-line no-param-reassign
        });
        this.setState({ places: data.results });
      });
  }

  render() {
    const { places } = this.state;

    return (
      <Fragment>
        {!isEmpty(places) && (
          <GoogleMap
            defaultZoom={10}
            defaultCenter={LOS_ANGELES_CENTER}
            bootstrapURLKeys={{ key: 'AIzaSyCSV1AmlA-ArhLJz9u0TXS8zQEXt5wmdAU' }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
          />
        )}
      </Fragment>
    );
  }
}

export default MarkerInfoWindowGmapsObj;
