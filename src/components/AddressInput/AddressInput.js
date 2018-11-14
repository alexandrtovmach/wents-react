import React from "react";
import { withScriptjs } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { compose, withProps, lifecycle } from "recompose";
import { Input } from 'semantic-ui-react';

const AddressInput = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_API_KEY
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
          const location = locations[0].geometry.location;
          const locationCoords = {
            lat: location.lat(),
            lng: location.lng(),
            address: locations[0].formatted_address
          };
          this.props.setLocation(locationCoords);
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
      type="text"
      icon={props.icon || null}
      iconPosition={props.icon? "left": null}
      value={props.value}
      placeholder={props.placeholder}
      className="location-search-input"
    />
  </StandaloneSearchBox>
));

export default AddressInput;