import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage} from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LocationMap.css';
import {
  Button, 
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
// Redux
import { connect } from 'react-redux';

// Google Places Map Component
import GoogleMapLoader from "react-google-maps-loader";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle } from "react-google-maps";

// Constants
import { googleMapAPI } from '../../../config';

// Assets
import mapPinIcon from './map-pin.png';

// Locale
import messages from '../../../locale/messages';

// Redux Actions
import { setStickyBottom } from '../../../actions/Sticky/StrickyActions';

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
        position: google.maps.ControlPosition.RIGHT_TOP
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
    {/* <Marker
      position={props.markers.position}
      draggable={false}
      icon={{
        url: mapPinIcon
      }}
    /> */}
  </GoogleMap>
));


class LocationMap extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      center: {},
      markers: null,
    }
  }

  componentWillMount () {
    const { data } = this.props;
    let lat = data.lat;
    let lng = data.lng;
    this.setState({
      center: {
        lat: Number(lat),
        lng: Number(lng),
      },
    });
  }

  componentDidMount () {
    const { center } = this.state;
    const { setStickyBottom } = this.props;
    let sticky = document.querySelector('[data-sticky-bottom]'), stickyBottom = 1615;
    const markers = { position: new google.maps.LatLng(center.lat, center.lng) };
    this.setState({ markers: markers });
    stickyBottom = (sticky.getBoundingClientRect().top);
    setStickyBottom(stickyBottom);
  }

  componentWillReceiveProps(nextProps) {
    const { setStickyBottom } = this.props;
    let sticky = document.querySelector('[data-sticky-bottom]'), stickyBottom = 1615;
    stickyBottom = (sticky.getBoundingClientRect().top);
    setStickyBottom(stickyBottom);
  }

  render() {
    const { center, markers } = this.state;
    const { data } = this.props;

    let displayName = data.user.profile.displayName;
    let city = data.city;
    let country = data.country;

    return (
	    <Row className={cx(s.pageContent)} data-sticky-bottom>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop3,s.horizontalLineThrough)}>
          <h1 className={cx(s.sectionTitleText, s.space2)}><FormattedMessage {...messages.neighborhood} /></h1>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2)}>
          <p><span className={cx(s.text)}>{displayName}{' '}<FormattedMessage {...messages.propertyLocated} />{' '}{city}, {country}</span></p>
            <div style={{height: 648}}>
              <GoogleMapPlace
                containerElement={
                  <div style={{ width: '100%', height: `100%` }} />
                }
                mapElement={
                  <div style={{ width: '100%', height: `100%` }} />
                }
                center={center}
                markers={markers}
              />
            </div>
            <p className={s.spaceTop1}>
              <span className={cx(s.text)}><FormattedMessage {...messages.neighborhoodInfo} /></span>
            </p>
        </Col>
      </Row>
    );
  }
}

//export default withStyles(s)(LocationMap);

const mapState = (state) => ({
  
});

const mapDispatch = {
  setStickyBottom
};

export default GoogleMapLoader(withStyles(s)(connect(mapState, mapDispatch)(LocationMap)), {
  libraries: ["places", "geometry"],
  region: "US",
  language: "en",
  key: googleMapAPI,
});
