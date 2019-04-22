import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavigationBeforeLogin.css';

import { Nav } from 'react-bootstrap';

import Link from '../Link';

// Modals
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import ForgotPassword from '../ForgotPassword';

import NavLink from '../NavLink';

// Locale
import messages from '../../locale/messages';

class NavigationBeforeLogin extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    setUserLogout: PropTypes.func,
    openLoginModal: PropTypes.func,
    openSignupModal: PropTypes.func,
  };

  render () {
    const { className, openLoginModal, openSignupModal } = this.props;
    return (
      <div>
      <LoginModal />
      <SignupModal />
      <ForgotPassword />
      <Nav pullRight>
        <NavLink to="/" className={"visible-xs"}>
          <FormattedMessage {...messages.home} />
        </NavLink>
        <NavLink to="/whyhost">
          <FormattedMessage {...messages.becomeAHost} />
        </NavLink>
        <NavLink to="/help">
          <FormattedMessage {...messages.help} />
        </NavLink>
        <NavLink to="#" noLink onClick={openLoginModal}>
          <FormattedMessage {...messages.login} />
        </NavLink>
        <NavLink to="#" noLink onClick={openSignupModal}>
          <FormattedMessage {...messages.signup} />
        </NavLink>
      </Nav>
    </div>
    );
  }

}

export default withStyles(s)(NavigationBeforeLogin);
