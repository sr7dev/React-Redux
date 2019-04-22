// General
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import * as FontAwesome from 'react-icons/lib/fa'
import cx from 'classnames';
import { 
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';

// Internal Components
import Link from '../Link';
import Navigation from '../Navigation';
import LanguageSwitcher from '../LanguageSwitcher';
import Logo from '../Logo';

// Assets
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

// External Components
import Toaster from '../Toaster';
import LoadingBar from 'react-redux-loading-bar';
import HeaderLocationSearch from './HeaderLocationSearch';

// Redux action
import { toggleOpen, toggleClose } from '../../actions/Menu/toggleControl';

import history from '../../core/history';

class Header extends React.Component {
  static propTypes = {
    borderLess : PropTypes.bool,
    showMenu: PropTypes.bool,
    toggleOpen: PropTypes.func.isRequired,
    formatMessage: PropTypes.func,
  };

  static defaultProps = {
    borderLess: false,
    showMenu: false,
    searchDisablePages: [
      '/',
      '/home'
    ]
  }

  constructor(props) {
    super(props);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleDisableSearchPages = this.handleDisableSearchPages.bind(this);
  }

  handleMenu() {
    const { showMenu, toggleOpen, toggleClose } = this.props;
    if(showMenu) {
      toggleClose();
    } else {
      toggleOpen();
    }
  }

  handleDisableSearchPages() {
    const { searchDisablePages } = this.props;
    let location = history.location ? history.location.pathname : null;
    let searchHide = false;
    if (location && searchDisablePages.length > 0) {
      searchHide = searchDisablePages.find((o) => location === o);
      searchHide = (searchHide) ? true : false;
    }

    return searchHide;
  }

  render() {
    const { siteSettings, borderLess, showMenu, toggleOpen } = this.props;
    let borderClass;
    let location;
    if(borderLess){
      borderClass = s.rentAllHeaderBorderLess;
    }
    if (history.location) {
      location = history.location.pathname;
    }

    return (
      <div className={s.root}>
        <Toaster />
        <LoadingBar />
        <div className={s.container}>
          <Navbar fluid className={cx(s.rentAllHeader, 'rentAllHeader', borderClass, { [s.fixedHeader]: location === '/s' }, { ['homeHeader']: location === '/' || location === '/home'})} 
            expanded={showMenu} onToggle={this.handleMenu}>
            <Navbar.Header>
              <Navbar.Brand className={cx('hidden-xs')}>
                <Logo link={"/"} className={cx(s.brand, s.brandImg)} />
              </Navbar.Brand>
              <Navbar.Toggle className={s.navBarToggle} children={
                <span>
                  <Logo link={"#"} className={cx(s.brand, s.brandImgToggle)} />
                  {
                    !showMenu && <FontAwesome.FaChevronDown />
                  }

                  {
                    showMenu && <FontAwesome.FaChevronUp />
                  }
                  
                </span>
              }/>
            </Navbar.Header>
            <Navbar.Collapse className={'location'}>
              <Navbar.Form pullLeft className={('hidden-xs', s.breakPoint, { ['hide']: this.handleDisableSearchPages()})}>
                <HeaderLocationSearch />
              </Navbar.Form>
              <Navigation />
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteSettings: state.siteSettings.data,
  showMenu: state.toggle.showMenu
});

const mapDispatch = {
  toggleOpen,
  toggleClose
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Header)));
