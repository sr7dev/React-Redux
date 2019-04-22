import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Button,
  Form,
  Grid,
  Row, FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Panel,
  Label,
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import logoUrl from './logo-small.jpg';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import { FormattedMessage, injectIntl } from 'react-intl';

// Component
import PaymentDetails from './PaymentDetails';
import PaymentForm from './PaymentForm';
import Avatar from '../../Avatar';
import CurrencyConverter from '../../CurrencyConverter';
import ListCoverPhoto from '../../ListCoverPhoto';

// Helper
import { convert } from '../../../helpers/currencyConvertion';

// Locale
import messages from '../../../locale/messages';

class Payment extends Component {

  static propTypes = {
    listId: PropTypes.number.isRequired,
    hostId: PropTypes.string.isRequired,
    guestId: PropTypes.string.isRequired,
    guestEmail: PropTypes.string.isRequired,
    hostDisplayName: PropTypes.string.isRequired,
    hostPicture: PropTypes.string,
    coverPhoto: PropTypes.string,
    listTitle: PropTypes.string.isRequired,
    allowedPersonCapacity: PropTypes.number.isRequired,
    listType: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    houseRules: PropTypes.arrayOf( PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string.isRequired
      })
    })),
    checkIn: PropTypes.object.isRequired,
    checkOut: PropTypes.object.isRequired,
    guests: PropTypes.number.isRequired,
    basePrice: PropTypes.number.isRequired,
    cleaningPrice: PropTypes.number,
    currency: PropTypes.string.isRequired,
    weeklyDiscount: PropTypes.number,
    monthlyDiscount: PropTypes.number,
    listPhotos: PropTypes.array,
    serviceFees: PropTypes.shape({
      guest: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
      }).isRequired,
      host: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    base: PropTypes.string.isRequired,
    rates: PropTypes.object.isRequired,
    bookingType: PropTypes.string.isRequired,
    policyName: PropTypes.string.isRequired,
    formatMessage: PropTypes.func,
  };

  render() {
    const { guestEmail, hostDisplayName, hostPicture, coverPhoto, listPhotos, bookingType, policyName } = this.props;
    const { listId, listTitle, listType, city, state, country, allowedPersonCapacity } = this.props;
    const { houseRules, hostId, guestId } = this.props;
    const { guests, checkIn, checkOut } = this.props;
    const { basePrice, cleaningPrice, currency, weeklyDiscount, monthlyDiscount } = this.props;
    const { serviceFees, base, rates } = this.props;
    let guestServiceFee = 0, hostServiceFee = 0, priceForDays = 0;
    let discount = 0, discountType, total = 0, totalWithoutFees = 0;
    let momentStartDate, momentEndDate, dayDifference;

    if(checkIn != null && checkOut != null){
      momentStartDate = moment(checkIn);
      momentEndDate = moment(checkOut);
      dayDifference = momentEndDate.diff(momentStartDate, 'days');
      priceForDays = Number(basePrice) * Number(dayDifference);
    }

    if(serviceFees){
        if(serviceFees.guest.type === 'percentage'){
            guestServiceFee = priceForDays * (Number(serviceFees.guest.value) / 100);
        } else {
            guestServiceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
        }

        if(serviceFees.host.type === 'percentage'){
            hostServiceFee = priceForDays * (Number(serviceFees.host.value) / 100);
        } else {
            hostServiceFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
        }

    }

    if(dayDifference >= 7){
        if(monthlyDiscount > 0 && dayDifference >= 28) {
            discount = (Number(priceForDays) * Number(monthlyDiscount)) / 100;
            discountType = monthlyDiscount + "% monthly price discount";
        } else {
            if(weeklyDiscount > 0){
              discount = (Number(priceForDays) * Number(weeklyDiscount)) / 100;
              discountType = weeklyDiscount + "% weekly price discount";
            }
        }
    }

    total = (priceForDays + guestServiceFee + cleaningPrice) - discount;
    totalWithoutFees = (priceForDays + cleaningPrice) - discount;

    let checkInDate = checkIn != null ? moment(checkIn).format('ddd, Do MMM') : '';
    let checkOutDate = checkOut != null ? moment(checkOut).format('ddd, Do MMM') : '';

    let initialValues = { 
      listId,
      listTitle,
      hostId,
      guestId,
      guests,
      checkIn,
      checkOut,
      basePrice,
      currency,
      cleaningPrice,
      discount,
      discountType,
      guestServiceFee,
      hostServiceFee,
      total: totalWithoutFees,
      bookingType,
      paymentType: '2',
      guestEmail
    };

    return (
      
      <Grid>
        <Row>
          <Col md={5} mdPush={7}>
            <div className={cx(s.summaryCard, s.colCenter)}>
              <ListCoverPhoto 
                className={cx(s.bannerImage, s.backgroundCover)}
                coverPhoto={coverPhoto}
                listPhotos={listPhotos}
                photoType={"x_medium"}
                bgImage
              />
              <div className={cx(s.hostProfilePhoto, s.pullRight, s.space3)}>
                <div className={cx(s.profileAvatarLink, s.profileAvatarSection)}>
                  <Avatar
                    source={hostPicture}
                    title={hostDisplayName}
                    className={s.profileAvatar}
                  />
                </div>
              </div>
              <Panel className={s.panelHeader}>
                <div className={cx(s.textMuted, s.space2)}>
                  <span><FormattedMessage {...messages.hostedBy} /> {hostDisplayName}</span>
                </div>
                <div className={cx(s.textLarge, s.space1)}>
                  <span>{listTitle}</span>
                </div>
                <div className={cx(s.textMuted)}>
                  <ul className={s.listStyle}>
                    <li>
                      {listType}
                    </li>
                  </ul>
                  <div> {city}, {state}, {country} </div>
                </div>
                <div className={s.spaceTop2}>
                  <hr className={s.horizondalLine} />
                  <Row className={cx(s.spaceTop3, s.space3)}>
                    <Col xs={5} sm={5}>
                      <div className={cx(s.textGray, s.space1)}>
                        <span><FormattedMessage {...messages.checkIn} /></span>
                      </div>
                      <div className={s.checkInDate}>{checkInDate}</div>
                    </Col>
                    <Col xs={1} sm={1}>
                      <FontAwesome.FaChevronRight className={cx(s.textGray, s.chevronIcon)} />
                    </Col>
                    <Col xs={5} sm={5} className={cx(s.pullRight, s.textLeft)}>
                      <div className={cx(s.textGray, s.space1)}>
                        <span><FormattedMessage {...messages.checkOut} /></span>
                      </div>
                      <div className={s.checkInDate}>{checkOutDate}</div>
                    </Col>
                  </Row>
                  <hr className={s.horizondalLine} />
                </div>

                <PaymentDetails 
                  basePrice={basePrice}
                  cleaningPrice={cleaningPrice}
                  currency={currency}
                  dayDifference={dayDifference}
                  priceForDays={priceForDays}
                  discount={discount}
                  discountType={discountType}
                  serviceFees={guestServiceFee}
                  total={total}
                />
                <div>
                  <span><FormattedMessage {...messages.cancellationPolicy} />: </span>
                  <span>{policyName}</span>
                </div>
              </Panel>
            </div>
          </Col>
          <Col md={7} mdPull={5}>
            <PaymentForm 
              hostDisplayName={hostDisplayName}
              houseRules={houseRules}
              allowedPersonCapacity={allowedPersonCapacity}
              initialValues={initialValues}
            />
          </Col>
        </Row>
      </Grid>

    );
  }
}

export default withStyles(s)(Payment);
