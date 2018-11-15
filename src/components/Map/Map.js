import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import {
  compose,
  withState,
  withProps,
  withHandlers,
  branch,
  renderComponent
} from "recompose";

import config from '../../config/firebase';
import './Map.scss';

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      config.apiKey
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div className="map-loading-element" />,
    containerElement: <div className="map-container-element" />,
    mapElement: <div className="map-element" />
  }),
  withState("zoom", "onZoomChange", 14),
  withHandlers(() => {
    const refs = {
      map: undefined
    };
    return {
      onMapMounted: () => ref => {
        refs.map = ref;
      },
      onZoomChanged: ({ onZoomChange }) => () => {
        onZoomChange(this.map.getZoom());
      },
      onLocationChange: props => position => {
        const latFn = position.latLng.lat;
        const lngFn = position.latLng.lng;
        const lat = latFn();
        const lng = lngFn();
        const location = { lat, lng };
        props.setLocation(location);
      }
    };
  }),
  withScriptjs,
  withGoogleMap
)(({ onMapMounted, zoom, location, onLocationChange, range }) => {
  return (
    <GoogleMap
      ref={onMapMounted}
      defaultZoom={zoom}
      zoom={zoom}
      center={location}
      defaultCenter={location}
      onClick={onLocationChange}
      options={{
        disableDefaultUI: true
      }}
    >
      <Marker
        position={location}
        draggable={true}
        onDragEnd={onLocationChange}
      />
    </GoogleMap>
  );
});

const MapWithPlaceholder = branch(
  props => !props.location,
  renderComponent(props => (
    <div className="map-placeholder">{props.placeholder}</div>
  )),
  renderComponent(props => {
    return <Map {...props} />;
  })
)();

export default MapWithPlaceholder;