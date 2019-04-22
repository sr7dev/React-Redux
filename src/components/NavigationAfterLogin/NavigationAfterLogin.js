import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, compose } from 'react-apollo';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavigationAfterLogin.css';
import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
// Internal Components
import Link from '../Link';
import NavLink from '../NavLink';
import MenuItemLink from '../MenuItemLink';
import Avatar from '../Avatar';
import Logout from '../Logout';
import Message from '../Message';
import WishListModal from '../WishListModal';
// Graphql
import UserBanStatusQuery from './getUserBanStatus.graphql';
// Locale
import messages from '../../locale/messages';
// Redux
import { connect } from 'react-redux';

import { setUserLogout } from '../../actions/logout';

class NavigationAfterLogin extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    setUserLogout: PropTypes.func,
    formatMessage: PropTypes.func,
    loginUserBanStatus: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getUserBanStatus: PropTypes.shape({
        userBanStatus: PropTypes.number,
      }),
    }),
  };
  static defaultProps = {
    loginUserBanStatus: {
      loading: true,
      getUserBanStatus: {
        userBanStatus: 0,
      },
    },
  };
  render() {
    const { loginUserBanStatus: { loading, getUserBanStatus } } = this.props;
    const { className, setUserLogout, wishListModal } = this.props;
    const { formatMessage } = this.props.intl;
    const { userData } = this.props;
    let isVerified;
    if (userData) {
      isVerified = userData.profileId;
    }
    if (!loading && getUserBanStatus) {
      if (getUserBanStatus.userBanStatus) {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
          window.location.reload();
          setUserLogout();
        }
      }
    }
    return (
      <Nav pullRight>
        <NavLink
          to="/"
          className={cx('visible-xs', s.breakPointScreen)}
        >
          <FormattedMessage {...messages.home} />
        </NavLink>
        <NavLink
          to="/dashboard"
          className={cx('visible-xs', s.breakPointScreen)}
        >
          <FormattedMessage {...messages.dashboard} />
        </NavLink>
        <NavDropdown
          className={cx('hidden-xs', s.nonBreakPointScreen)}
          eventKey={3}
          title={formatMessage(messages.host)}
          noCaret id="basic-nav-dropdown"
        >
          <MenuItemLink to="/rooms">
            <FormattedMessage {...messages.manageListing} />
          </MenuItemLink>
          <MenuItemLink to="/become-a-host?mode=new">
            <FormattedMessage {...messages.listYourSpace} />
          </MenuItemLink>
          <MenuItemLink to="/reservation/current">
            <FormattedMessage {...messages.yourReservations} />
          </MenuItemLink>
          <MenuItemLink to="/user/transaction">
            <FormattedMessage {...messages.transactionHistory} />
          </MenuItemLink>
        </NavDropdown>
        <NavLink
          to={"/users/show/" + isVerified}
          className={cx('visible-xs', s.breakPointScreen)}
        >
          <FormattedMessage {...messages.profile} />
        </NavLink>
        <NavLink
          to="/user/payout"
          className={cx('visible-xs', s.breakPointScreen)}
        >
          <FormattedMessage {...messages.accountSettings} />
        </NavLink>
        <NavLink to="/wishlists" >
          <FormattedMessage {...messages.saved} />
        </NavLink>
        <NavLink to="/trips/current" >
          <FormattedMessage {...messages.trips} />
        </NavLink>
        <NavLink to="/rooms" className={cx('visible-xs', s.breakPointScreen)}>
          <FormattedMessage {...messages.host} />
        </NavLink>
        <Message />
        <NavLink to="/help">
          <FormattedMessage {...messages.help} />
        </NavLink>
        <Logout className={cx('visible-xs', s.breakPointScreen)} />
        <NavDropdown
          className={cx('hidden-xs', s.nonBreakPointScreen)} eventKey={3} title={
            <Avatar
              isUser
              type={'small'}
              height={30}
              width={30}
              className={s.userAvatar}
            />
          } noCaret id="basic-nav-dropdown"
        >
          <MenuItemLink to="/dashboard">
            <FormattedMessage {...messages.dashboard} />
          </MenuItemLink>
          <MenuItemLink to="/user/edit">
            <FormattedMessage {...messages.editProfile} />
          </MenuItemLink>
          <MenuItemLink to="/user/payout">
            <FormattedMessage {...messages.accountSettings} />
          </MenuItemLink>
          <Logout />
        </NavDropdown>
        {
          wishListModal && <WishListModal />
        }
      </Nav>
    );
  }
}
const mapState = state => ({
  wishListModal: state.modalStatus.wishListModalOpen,
  userData: state.account.data,
});
const mapDispatch = {
  setUserLogout
};
export default
  compose(
    injectIntl,
    withStyles(s),
    graphql(UserBanStatusQuery, {
      name: 'loginUserBanStatus',
      options: {
        ssr: false,
        pollInterval: 5000,
      },
    }),
    (connect(mapState, mapDispatch)))(NavigationAfterLogin);
