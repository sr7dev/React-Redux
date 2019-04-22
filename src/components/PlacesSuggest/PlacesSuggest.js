// General
import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Redux actions
import { getLocationData } from '../../actions/getLocation';

// Google Places Suggest Component
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";

// Styles
import s from '!isomorphic-style-loader!css-loader!react-google-places-suggest/lib/index.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormControl } from 'react-bootstrap';

// Constants
import { googleMapAPI } from '../../config';

class PlacesSuggest extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    googleMaps: PropTypes.object,
    getLocationData: PropTypes.func,
  };

  handleSearchChange = (e) => {
    return e.target.value;
  }

  handleSelectSuggest = (suggest, coordinate) => {
    this.props.getLocationData(suggest.description);
    return suggest.description;
  }

  /*renderDefaultSuggest = (suggest) => {
    const {description, structured_formatting} = suggest
    const firstMatchedString = structured_formatting.main_text_matched_substrings.shift()
    let labelParts = null

    if (firstMatchedString) {
      labelParts = {
        before: description.substr(0, firstMatchedString.offset),
        matched: description.substr(firstMatchedString.offset, firstMatchedString.length),
        after: description.substr(firstMatchedString.offset + firstMatchedString.length),
      }
    }

    return (
      <div>
        <span className="placesSuggest_suggestLabel">
          {labelParts
            ? <span>
                {labelParts.before.length > 0 ? <span>{labelParts.before}</span> : null}
                <span className="placesSuggest_suggestMatch">{labelParts.matched}</span>
                {labelParts.after.length > 0 ? <span>{labelParts.after}</span> : null}
              </span>
            : description
          }
        </span>
      </div>
    )
  }*/

  render() {

    const { value, onChange, label, className } = this.props;
    const { googleMaps } = this.props;

    return (
        <GooglePlacesSuggest
          googleMaps={googleMaps}
          onSelectSuggest={(suggest, coordinate) => onChange(this.handleSelectSuggest(suggest, coordinate))}
          search={value}
          textNoResults={null}
        >
          <FormControl
            type="text"
            placeholder={label}
            onChange={(e) => onChange(this.handleSearchChange(e))}
            className={className}
          />
        </GooglePlacesSuggest>
    );
  }
}

const mapState = (state) => ({
});

const mapDispatch = {
  getLocationData,
};

export default GoogleMapLoader(withStyles(s)(connect(mapState, mapDispatch)(PlacesSuggest)), {
  libraries: ["places"],
  region: "US",
  language: "en",
  key: googleMapAPI,
});
