import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';

import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  Grid,
  FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import LanguageSwitcher from '../LanguageSwitcher';
import CurrencySwitcher from '../CurrencySwitcher';
import Link from '../Link';

// Locale
import messages from '../../locale/messages';

class Footer extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
    formatMessage: PropTypes.func,
  };

  render() {
    const { siteName, facebook, twitter, instagram } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={cx(s.footerSectionContainer, 'hidden-print')}>
            <Grid fluid>
              <Row>
                <Col xs={12} sm={3} md={2} lg={2} className={cx(s.dropDownSection)}>
                  <CurrencySwitcher />
                  <LanguageSwitcher />
                </Col>

                <Col sm={3} mdOffset={1} md={2} lgOffset={1} lg={2} xsHidden className={cx(s.noPadding)}>
                  <label className={s.landingLabel}>{siteName}</label>
                  <ul className={s.listContainer}>
                    <li>
                      <Link to={'/about'} className={s.textLink} >
                        <FormattedMessage {...messages.about} />
                      </Link>
                    </li>
                    <li>
                      <Link to={'/careers'} className={s.textLink} >
                        <FormattedMessage {...messages.careers} />
                      </Link>
                    </li>
                    <li>
                      <Link to={'/press'} className={s.textLink} >
                        <FormattedMessage {...messages.press} />
                      </Link>
                    </li>
                    <li>
                      <Link to={'/policies'} className={s.textLink} >
                        <FormattedMessage {...messages.policies} />
                      </Link>
                    </li>
                    <li>
                      <Link to={'/help'} className={s.textLink} >
                        <FormattedMessage {...messages.help} />
                      </Link>
                    </li>
                    <li>
                      <Link to={'/contact'} className={s.textLink} >
                        <FormattedMessage {...messages.contactForm} />
                      </Link>
                    </li>
                  </ul>
                </Col>


                <Col sm={3} mdOffset={1} md={2} lgOffset={1} lg={2} xsHidden className={cx(s.noPadding)}>
                  <label className={s.landingLabel}>
                    <FormattedMessage {...messages.discover} />
                  </label>
                  <ul className={s.listContainer}>
                    <li>
                      <Link to={'/safety'} className={s.textLink} >
                        <FormattedMessage {...messages.trustSafety} />
                      </Link>
                    </li>
                    <li>
                      <Link to={'/travel'} className={s.textLink} >
                        <FormattedMessage {...messages.travelCredit} />
                      </Link>
                    </li>
                    <li>
                      <Link to={'/citizen'} className={s.textLink} >{siteName}{' '}
                        <FormattedMessage {...messages.citizen} />
                      </Link>
                    </li>
                    <li>
                      <Link to={'/business'} className={s.textLink} >
                        <FormattedMessage {...messages.businessTravel} />
                      </Link>
                    </li>
                    <li>
                      <Link to={'/guide'} className={s.textLink} >
                        <FormattedMessage {...messages.guidebooks} />
                      </Link>
                    </li>
                  </ul>
                </Col>

                <Col sm={3} mdOffset={1} md={2} lgOffset={1} lg={2} xsHidden className={cx(s.noPadding)}>
                  <label className={s.landingLabel}>
                    <FormattedMessage {...messages.hosting} />
                  </label>
                  <ul className={s.listContainer}>
                    <li>
                      <Link to={'/whyhost'} className={s.textLink} >
                        <FormattedMessage {...messages.becomeAHost} />
                      </Link>
                    </li>
                    <li>
                      <Link to={'/hospitality'} className={s.textLink} >
                        <FormattedMessage {...messages.hospitality} />
                      </Link>
                    </li>
                    <li>
                      <Link to={'/responsible-hosting'} className={s.textLink} >
                        <FormattedMessage {...messages.responsibleHosting} />
                      </Link>
                    </li>
                  </ul>
                </Col>
              </Row>

              <Row className={s.copyrightSection}>
                <hr className={s.horizontalLineThrough} />

                <Col xs={6} sm={4} md={4} lg={4} className={s.noPadding}>
                  <span className={s.text}>© {siteName}.</span>
                </Col>
                <Col xs={6} sm={8} md={8} lg={8} className={s.noPadding}>
                  <Link className={cx(s.textLink, s.pullRight, s.footerLink)} to={'/privacy'}>
                    <FormattedMessage {...messages.termsPrivacy} />
                  </Link>
                  {
                instagram && <a href={instagram} target="_blank" className={cx(s.shareIcon, s.xsHidden)}>
                  <FontAwesome.FaInstagram />
                </a>
              }
                  {
                twitter && <a href={twitter} target="_blank" className={cx(s.shareIcon, s.xsHidden)}>
                  <FontAwesome.FaTwitter />
                </a>
              }
                  {
                facebook && <a href={facebook} target="_blank" className={cx(s.shareIcon, s.xsHidden)}>
                  <FontAwesome.FaFacebook />
                </a>
              }
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>

    );
  }
}


const mapState = state => ({
  siteName: state.siteSettings.data.siteName,
  facebook: state.siteSettings.data.facebookLink,
  twitter: state.siteSettings.data.twitterLink,
  instagram: state.siteSettings.data.instagramLink,
});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(Footer));
