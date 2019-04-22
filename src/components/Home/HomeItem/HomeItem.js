import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeItem.css';
import {Button, Grid, Row, Col, Breadcrumb} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import { FormattedMessage, injectIntl } from 'react-intl';

// Component
import StarRating from '../../StarRating';
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import ListCoverPhoto from '../../ListCoverPhoto';
import WishListIcon from '../../WishListIcon';

// Locale
import messages from '../../../locale/messages';

class HomeSlider extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.func,
    id: PropTypes.number,
    photo: PropTypes.string.isRequired,
    beds : PropTypes.number.isRequired,
    title : PropTypes.string.isRequired,
    basePrice: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    roomType: PropTypes.string.isRequired,
    bookingType: PropTypes.string.isRequired,
    listPhotos: PropTypes.array.isRequired,
    coverPhoto: PropTypes.number,
    reviewsCount: PropTypes.number,
    reviewsStarRating: PropTypes.number,
    wishListStatus: PropTypes.bool,
    isListOwner: PropTypes.bool
  };

  render() {
    const { id, photo, basePrice, currency, roomType, beds, title, bookingType } = this.props;
    const { listPhotos, coverPhoto, reviewsCount, reviewsStarRating, wishListStatus, isListOwner } = this.props;
    const { formatMessage } = this.props.intl;
    let imagePath = '/images/upload/x_medium_' + photo;
    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Number(reviewsStarRating / reviewsCount)
    }
    return (
      <div>
        <div className={cx(s.imgContainer)}>
          {
            !isListOwner && <WishListIcon listId={id} key={id} isChecked={wishListStatus} />
          }  
          <div className={cx(s.parent)}>
            <div className={cx(s.children)}>
              <div className={cx(s.content)}>
                <a href={"/rooms/" + id} target={'_blank'}>
                  <ListCoverPhoto
                    className={cx(s.imageContent)}
                    coverPhoto={coverPhoto}
                    listPhotos={listPhotos}
                    photoType={"x_medium"}
                    bgImage
                  />
                </a>
                
              </div>
            </div>
          </div>
        </div>
        <div className={s.infoContainer}>
          <a className={s.linkContainer} href={"/rooms/" + id} target={'_blank'}>
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                className={cx(s.textStrong, s.space1, s.textEllipsis, s.infoTitle, s.infoText)}
              >
                <span className={s.roomTitleBlock}>
                  <CurrencyConverter
                      amount={basePrice}
                      from={currency}
                  />
                  {
                    bookingType === "instant" && <span><FontAwesome.FaBolt className={s.instantIcon}/></span>
                  } 
                </span>
                <span>{title}</span>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={12}
                className={cx(s.space1, s.textEllipsis, s.infoDesc, s.infoText)}>
                <span>{roomType}</span>
                <span>&nbsp;&#183;&nbsp;</span>
                <span>{beds} {beds > 1 ? 'beds' : 'bed'}</span>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={12}
                className={cx(s.textEllipsis, s.infoReview, s.infoText)}>
                <StarRating className={s.reviewStar} value={starRatingValue} name={'review'}/>
                <span className={s.reviewText}>
                  {reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}
                </span>
              </Col>
            </Row>
          </a>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(HomeSlider));
