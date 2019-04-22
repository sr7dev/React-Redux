import React from 'react';
import PropTypes from 'prop-types';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingDetails.css';
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
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Locale
import messages from '../../../locale/messages';
// Redux
import { connect } from 'react-redux';
// Redux Action
import { getSpecificSettings } from '../../../actions/getSpecificSettings';
import { contactHostOpen } from '../../../actions/message/contactHostModal';
// Helper functions
import { formattingTime, checkIn, checkValue } from './helper';
// Internal Component
import ListItem from './ListItem';
import Link from '../../Link';

import ListBedTypes from './ListBedTypes';

class ListingDetails extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      listingData: PropTypes.shape({
        cancellation: PropTypes.shape({
          policyName: PropTypes.string.isRequired,
          policyContent: PropTypes.string.isRequired
        })
      })
    }),
    getSpecificSettings: PropTypes.func,
    settingsData: PropTypes.object,
    isHost: PropTypes.bool.isRequired,
    formatMessage: PropTypes.func,
    userBanStatus: PropTypes.number,
  };
  static defaultProps = {
    isHost: false
  };
  render() {
    const { data, contactHostOpen, isHost, userBanStatus } = this.props;
    const { formatMessage } = this.props.intl;
    let minNight, maxNight, checkInStart, checkInEnd, propertyType, roomType;
    let userAmenities = [], userSafetyAmenities = [], amenities = [];
    let sharedSpaces = [], houseRules = [], bedTypes = [], listBedTypes = [];
    let description, personCapacity, bathrooms, bedrooms, beds;
    if (data.listingData != undefined) {
      minNight = checkValue(data.listingData.minNight, 0);
      maxNight = checkValue(data.listingData.maxNight, 0);
      checkInStart = checkValue(data.listingData.checkInStart, '');
      checkInEnd = checkValue(data.listingData.checkInEnd, '');
    }
    if (data.settingsData != undefined) {
      propertyType = checkValue(data.settingsData[1].listsettings.itemName, '');
      roomType = checkValue(data.settingsData[0].listsettings.itemName, '');
    }
    sharedSpaces = checkValue(data.userSpaces, []);
    houseRules = checkValue(data.houseRules, []);
    userAmenities = checkValue(data.userAmenities, []);
    userSafetyAmenities = checkValue(data.userSafetyAmenities, []);
    description = checkValue(data.description, '');
    personCapacity = checkValue(data.personCapacity, 0);
    bathrooms = checkValue(data.bathrooms, 0);
    bedrooms = checkValue(data.bedrooms, 0);
    beds = checkValue(data.beds, 0);
    bedTypes = checkValue(data.userBedsTypes, []);
    listBedTypes = checkValue(data.listBedTypes, []);

    return (
      <Row className={cx(s.pageContent)}>
        <Col xs={12} sm={12} md={8} lg={8} className={cx(s.spaceTop5, s.horizontalLineThrough)}>
          <h2 className={cx(s.sectionTitleText)}> <FormattedMessage {...messages.aboutListing} /></h2>
          <p>
            {
              description && (description.trim()).split("\n").map(function (item, index) {
                return (
                  <span key={index}>
                    {item}
                    <br />
                  </span>
                )
              })
            }
          </p>
          {
            !isHost && !userBanStatus && <p className={s.space2}>
              <a href="javascript:void(0)" className={cx(s.sectionCaptionLink)} onClick={() => contactHostOpen(data.id)} >
                <FormattedMessage {...messages.contactHost} />
              </a>
            </p>
          }
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} className={cx(s.space2, s.horizontalLineThrough)}>
          <Row>
            <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space1, s.spaceTop3)}>
              <p className={s.textMuted}><FormattedMessage {...messages.theSpace} /></p>
            </Col>
            <Col xs={12} sm={9} md={9} lg={9} className={cx(s.space1, s.spaceTop3)}>
              <Row>
                <Col md={12} lg={12}>
                  <p className={s.splitList}>
                    <span className={cx(s.text)} >
                      <FormattedMessage {...messages.accommodates} />: <strong>{personCapacity}</strong>
                    </span>
                  </p>
                  <p className={s.splitList}>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.bathrooms} />: <strong>{bathrooms}</strong>
                    </span>
                  </p>
                  <p className={s.splitList}>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.bedrooms} />: <strong>{bedrooms}</strong>
                    </span>
                  </p>
                  {/* <p>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.beds} />: <strong>{beds}</strong>
                    </span>
                  </p> */}
                
                  <p className={s.splitList}>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.checkIn} />: <strong>{checkIn(checkInStart, checkInEnd)}</strong>
                    </span>
                  </p>
                  <p className={s.splitList}>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.propertyType} />: <strong>{propertyType}</strong>
                    </span>
                  </p>
                  <p className={s.splitList}>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.roomType} />: <strong>{roomType}</strong>
                    </span>
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        {
          listBedTypes && listBedTypes.length > 0 && listBedTypes[0].bedType &&<ListBedTypes
            itemList={listBedTypes}
            label={formatMessage(messages.beds)}
          />
        }

        {
          sharedSpaces && sharedSpaces.length > 0 && <ListItem
            itemList={sharedSpaces}
            label={formatMessage(messages.sharedSpaces)}
          />
        }
        {
          userAmenities && userAmenities.length > 0 && <ListItem
            itemList={userAmenities}
            label={formatMessage(messages.aminities)}
          />
        }
        {
          /* <Col xs={12} sm={12} md={8} lg={8} className={cx(s.space2, s.horizontalLineThrough)}>
          <Row>
            <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space1, s.spaceTop1)}>
              <p className={s.textMuted}> <FormattedMessage {...messages.prices} /> </p>
            </Col>
            <Col xs={12} sm={9} md={9} lg={9} className={cx(s.space1,s.spaceTop1)}>
              <Row>
                <Col md={6} lg={6}>
                  <p>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.extraPeople} />: <strong><FormattedMessage {...messages.noCharge} /></strong>
                    </span>
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col> */
        }
        {
          houseRules.length > 0 && <ListItem
            itemList={houseRules}
            label={formatMessage(messages.houseRules)}
          />
        }
        {
          data && data.listingData && data.listingData.cancellation && <Col xs={12} sm={12} md={8} lg={8} className={cx(s.space2, s.horizontalLineThrough)}>
            <Row>
              <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space1, s.spaceTop1)}>
                <p className={s.textMuted}><FormattedMessage {...messages.cancellations} /></p>
              </Col>
              <Col xs={12} sm={9} md={9} lg={9} className={cx(s.space1, s.spaceTop1)}>
                <Row>
                  <Col md={12} lg={12}>
                    <p>
                      <span className={cx(s.text)}><strong>{data.listingData.cancellation.policyName}</strong></span>
                    </p>
                    <p>
                      <span className={cx(s.text)}>{data.listingData.cancellation.policyContent}</span>
                    </p>
                    <div>
                      <Link
                        to={"/cancellation-policies/" + data.listingData.cancellation.policyName}
                        className={cx(s.sectionCaptionLink)}
                      >
                        <FormattedMessage {...messages.viewDetails} />
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        }
        {
          userSafetyAmenities.length > 0 && <ListItem
            itemList={userSafetyAmenities}
            label={formatMessage(messages.safetyFeatures)}
          />
        }
        {
          ((minNight != null && minNight) || (maxNight != null && maxNight > 0)) && <Col xs={12} sm={12} md={8} lg={8} className={s.space2}>
            <Row>
              <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space1, s.spaceTop1)}>
                <p className={s.textMuted}> <FormattedMessage {...messages.availability} /> </p>
              </Col>
              <Col xs={12} sm={9} md={9} lg={9} className={cx(s.space1, s.spaceTop1)}>
                <Row>
                  <Col md={6} lg={6}>
                    {
                      minNight != null && minNight > 0 &&
                      <p><span className={cx(s.text)}> <strong>{minNight} {minNight > 1 ? 'nights' : 'night'}{' '}</strong>
                        <FormattedMessage {...messages.minimumStay} />
                      </span>
                      </p>
                    }
                    {
                      maxNight != null && maxNight > 0 &&
                      <p><span className={cx(s.text)}> <strong>{maxNight} {maxNight > 1 ? 'nights' : 'night'}{' '}</strong>
                        <FormattedMessage {...messages.maximumNightStay} />
                      </span>
                      </p>
                    }
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        }
      </Row>
    );
  }
}
const mapState = (state) => ({
  settingsData: state.viewListing.settingsData,
});
const mapDispatch = {
  getSpecificSettings,
  contactHostOpen
};
export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ListingDetails)));