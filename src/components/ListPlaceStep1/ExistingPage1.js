// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Locale
import messages from '../../locale/messages';
// Style
import {
  Button,
  Grid,
  Row,
  Col,
  FormGroup
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ExistingPage.css';
// Component
import ListPlaceTips from '../ListPlaceTips';
import Loader from '../Loader';
import Link from '../Link';
// Redux action
import { ManagePublishStatus } from '../../actions/Listing/ManagePublishStatus';
class ExistingPage1 extends Component {
  static propTypes = {
    listingSteps: PropTypes.shape({
      step1: PropTypes.string.isRequired,
      step2: PropTypes.string.isRequired,
      step3: PropTypes.string.isRequired,
      listing: PropTypes.shape({
        id: PropTypes.number.isRequired,
        isReady: PropTypes.bool.isRequired,
        isPublished: PropTypes.bool.isRequired
      }),
      user: PropTypes.shape({
        userBanStatus: PropTypes.number,
      }),
    }),
    nextPage: PropTypes.func.isRequired,
    stepsLoading: PropTypes.bool,
    ManagePublishStatus: PropTypes.func.isRequired,
  };
  static defaultProps = {
    listingSteps: {
      step1: "inactive",
      step2: "inactive",
      step3: "inactive",
      listing: {
        id: 0,
        isReady: false,
        isPublished: false
      },
      user: {
        userBanStatus: 0,
      }
    },
    photosCount: 0,
    stepsLoading: false,
  };
  render() {
    const { nextPage, listingSteps, photosCount, stepsLoading, account } = this.props;
    if (stepsLoading) {
      return <Loader type={"text"} />
    }
    const { listingSteps: { listing: { id, isReady, isPublished, user } } } = this.props;
    let userBanStatusValue;
    if (user) {
      const { listingSteps: { listing: { user: { userBanStatus } } } } = this.props;
      userBanStatusValue = userBanStatus;
    }
    const { listingSteps: { step1, step2, step3 } } = this.props;
    const { ManagePublishStatus } = this.props;
    let isPhotoAvailable = false;
    if (photosCount > 0) {
      isPhotoAvailable = true;
    }
    return (
      <div className={s.spaceTop5}>
        <Grid>
          <Row className={s.landingContainer}>
            <Col xs={12} sm={7} md={7} lg={7}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <h3 className={s.landingTitle}><FormattedMessage {...messages.step1Heading} /></h3>
              </Col>
              <Col xs={10} sm={10} md={10} lg={10} >
                <p className={cx(s.landingTitleStep, )}><span><FormattedMessage {...messages.step1HeadingContent} /></span></p>
                {
                  step1 == "active" && <Button className={cx(s.button, s.btnPrimary)} onClick={() => nextPage('map')}>
                    <FormattedMessage {...messages.continue} />
                  </Button>
                }
                {
                  step1 == "completed" && <a href="javascript:void(0);" className={s.modalCaptionLink} onClick={() => nextPage('room')}>
                    <FormattedMessage {...messages.change} />
                  </a>
                }
              </Col>
              {
                step1 == "completed" && <Col xs={2} sm={2} md={2} lg={2} >
                  <span className={s.icon} ><FontAwesome.FaCheckCircle /></span>
                </Col>
              }
              <Col xs={12} sm={12} md={12} lg={12}>
                <hr className={s.horizontalLineThrough} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <strong className={s.step}><span><FormattedMessage {...messages.step2Heading} /></span></strong>
                <h3 className={s.landingContentTitle}><FormattedMessage {...messages.step2SubHeading} /></h3>
              </Col>
              <Col xs={10} sm={10} md={10} lg={10} >
                <p className={cx(s.landingTitleStep, )}><span><FormattedMessage {...messages.step2HeadingContent} /></span></p>
                {
                  step2 == "active" && <Button className={cx(s.button, s.btnPrimary)} onClick={() => nextPage('photos')}>
                    <FormattedMessage {...messages.continue} />
                  </Button>
                }
                {
                  step2 == "completed" && !isPhotoAvailable && <Button className={cx(s.button, s.btnPrimary)} onClick={() => nextPage('photos')}>
                    <FormattedMessage {...messages.continue} />
                  </Button>
                }
                {
                  step2 == "completed" && isPhotoAvailable && <a href="javascript:void(0);" className={s.modalCaptionLink} onClick={() => nextPage('photos')}>
                    <FormattedMessage {...messages.change} />
                  </a>
                }
              </Col>
              {
                step2 == "completed" && <Col xs={2} sm={2} md={2} lg={2} >
                  <span className={s.icon} ><FontAwesome.FaCheckCircle /></span>
                </Col>
              }
              <Col xs={12} sm={12} md={12} lg={12}>
                <hr className={s.horizontalLineThrough} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <strong className={s.step}><span><FormattedMessage {...messages.step3Heading} /></span></strong>
                <h3 className={s.landingContentTitle}><FormattedMessage {...messages.step3SubHeading} /></h3>
              </Col>
              <Col xs={10} sm={10} md={10} lg={10} >
                <p className={cx(s.landingTitleStep, )}><span><FormattedMessage {...messages.step3HeadingContent} /></span></p>
                {
                  step3 == "active" && <Button className={cx(s.button, s.btnPrimary)} onClick={() => nextPage('guest-requirements')}>
                    <FormattedMessage {...messages.continue} />
                  </Button>
                }
                {
                  step3 == "completed" && <a href="javascript:void(0);" className={s.modalCaptionLink} onClick={() => nextPage('guest-requirements')}>
                    <FormattedMessage {...messages.change} />
                  </a>
                }
              </Col>
              {
                step3 == "completed" && <Col xs={2} sm={2} md={2} lg={2} >
                  <span className={s.icon} ><FontAwesome.FaCheckCircle /></span>
                </Col>
              }
              <Col xs={12} sm={12} md={12} lg={12}>
                <hr className={s.horizontalLineThrough} />
              </Col>
              {
                listingSteps && isReady && !isPublished && !userBanStatusValue && <Col xs={12} sm={12} md={12} lg={12} >
                  <h3 className={s.spaceTop1}>
                    <FormattedMessage {...messages.readyToPublish} />
                  </h3>
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                    <Button className={cx(s.button, s.btnPrimary)} onClick={() => ManagePublishStatus(id, 'publish')}>
                      <FormattedMessage {...messages.publishNow} />
                    </Button>
                    <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink)}>
                      <FormattedMessage {...messages.previewListing} />
                    </a>
                  </Col>
                </Col>
              }
              {
                listingSteps && isReady && isPublished && !userBanStatusValue && <Col xs={12} sm={12} md={12} lg={12} >
                  <h3 className={s.spaceTop1}>
                    <FormattedMessage {...messages.listingPublished} />
                  </h3>
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                    <Button
                      className={cx(s.button, s.btnPrimary)}
                      onClick={() => ManagePublishStatus(id, 'unPublish')}
                    >
                      <FormattedMessage {...messages.unPublishNow} />
                    </Button>
                    <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink)}><FormattedMessage {...messages.previewListing} /> </a>
                  </Col>
                </Col>
              }
              {
                userBanStatusValue == true && <Col xs={12} sm={12} md={12} lg={12} >
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                    <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLinkUserBan)}>
                      <FormattedMessage {...messages.previewListing} />
                    </a>
                  </Col>
                </Col>
              }
            </Col>
            <ListPlaceTips />
          </Row>
        </Grid>
      </div>
    );
  }
}
const mapState = (state) => ({
  listingSteps: state.location.listingSteps,
  stepsLoading: state.location.stepsLoading,
  account: state.account.data,
});
const mapDispatch = {
  ManagePublishStatus
};
export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ExistingPage1)));
