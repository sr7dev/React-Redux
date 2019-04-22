// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Redux actions
import { getLocationData } from '../../actions/getLocation';
import { change } from 'redux-form';

// Google Places Map Component
import GoogleMapLoader from "react-google-maps-loader";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle } from "react-google-maps";

// Font Awesome 
import * as FontAwesome from 'react-icons/lib/fa';

// Assets
import mapPinIcon from './map-pin.png';


// Constants
import { googleMapAPI } from '../../config';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PlaceMap.css';
import cx from 'classnames';

const GoogleMapPlace =
  withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}

    center={props.center}
    defaultOptions={{
      backgroundColor: '',
      scrollwheel: false,
      maxZoom: 16,
      minZoom: 11,
      streetViewControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      },
      mapTypeControl: false,
    }}
  >
  <Circle
    center={props.center}
    radius={500}
   options={{
     fillColor: '#00d1c1',
     strokeColor: '#007A87',
   }}
  />
    <Marker
      position={props.markers.position}
      draggable={true}
      onDragEnd={(event) => props.handleMarkerDragEnd(event)}
      icon={{
        url: mapPinIcon
      }}
    />
  </GoogleMap>
));

class PlaceMap extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    isMapTouched: PropTypes.bool,
    onChange: PropTypes.func,
    change: PropTypes.func,
    mapSuccess: PropTypes.string,
    mapWarning: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      center: null,
      isMapTouched: false,
      markers: null,
      success: false
    }
    this.handleMarkerDragEnd = this.handleMarkerDragEnd.bind(this);
  }

  componentWillMount () {
    const { lat, lng, isMapTouched } = this.props;
    this.setState({
      center: {
        lat: Number(lat),
        lng: Number(lng),
      },
      isMapTouched: isMapTouched,
    });
  }

  componentDidMount () {
    const markers = { position: new google.maps.LatLng(this.state.center.lat, this.state.center.lng) };
    this.setState({markers: markers});
  }

  geometryValue(value) {
    return value;
  }

  handleMarkerDragEnd(targetMarker) {
    const { isMapTouched } = this.state;
    const { onChange, change } = this.props;
    const center = {
      lat: targetMarker.latLng.lat(),
      lng: targetMarker.latLng.lng(),
      isMapTouched: true
    };
    this.setState({center: center, isMapTouched: true});
    if(!isMapTouched){
      this.setState({ success: true });
    }
    //onChange(this.geometryValue(center));
    change("ListPlaceStep1", "lat", center.lat);
    change("ListPlaceStep1", "lng", center.lng);
    change("ListPlaceStep1", "isMapTouched", center.isMapTouched);
  }

  renderWarning (message){
    const { isMapTouched, success } = this.state;
    if(!isMapTouched){
      return (
        <div className={cx(s.alertContainer, s.alertDanger)}>
          <FontAwesome.FaExclamationCircle className={s.dangerIcon}/>
          <strong><span>{message}</span></strong>
        </div>
      );
    }
    if(isMapTouched && success){
      return (
        <div className={cx(s.alertContainer, s.alertSuccess)}>
          <FontAwesome.FaCheckCircle className={s.successIcon}/>
          <strong><span>{message}</span></strong>
        </div>
      );
    } 
    
  }

  render() {
    const { isMapTouched, center, markers } = this.state;
    const { mapWarning, mapSuccess } = this.props;
    let message;

    if(!isMapTouched){
      message = mapWarning;
    } else {
      message = mapSuccess;
    }

    return (
      <div>
        
        {this.renderWarning(message)}
        
        <div style={{height: 300}}>
        <GoogleMapPlace
          containerElement={
            <div style={{ width: '100%', height: `100%` }} />
          }
          mapElement={
            <div style={{ width: '100%', height: `100%` }} />
          }
          center={center}
          markers={markers}
          handleMarkerDragEnd={this.handleMarkerDragEnd}
        />
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
});

const mapDispatch = {
  change
};

export default GoogleMapLoader(withStyles(s)(connect(mapState, mapDispatch)(PlaceMap)), {
  libraries: ["places", "geometry"],
  region: "US",
  language: "en",
  key: googleMapAPI,
});
