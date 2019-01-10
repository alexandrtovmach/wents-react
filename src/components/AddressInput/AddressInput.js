import React from "react";
import { withScriptjs } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { compose, withProps, lifecycle } from "recompose";
import { Input } from 'semantic-ui-react';

// import config from '../../config/firebase';

const AddressInput = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_API_KEY
      // config.apiKey
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentDidMount() {
      this.setState({
        onSearchBoxMounted: ref => {
          this.searchBox = ref;
        },
        onPlacesChanged: () => {
          const locations = this.searchBox.getPlaces();
          const locationItem = locations && locations[0];
          const locationCoords = {
            lng: locationItem && locationItem.geometry && locationItem.geometry.location.lng(),
            lat: locationItem && locationItem.geometry && locationItem.geometry.location.lat(),
            address: locationItem && (locationItem.formatted_address || locationItem.name)
          };
          if (locationCoords.lng && locationCoords.lat && locationCoords.address) {
            this.props.setLocation(locationCoords);
          }
        }
      });
    }
  }),
  withScriptjs
)(props => (
  <StandaloneSearchBox
    ref={props.onSearchBoxMounted}
    bounds={props.bounds}
    onPlacesChanged={props.onPlacesChanged}
  >
    <Input
      onChange={props.onPlacesChanged}
      type="text"
      icon={props.icon || null}
      iconPosition={props.icon? "left": null}
      defaultValue={props.value}
      placeholder={props.placeholder}
      className="location-search-input"
    />
  </StandaloneSearchBox>
));

export default AddressInput;