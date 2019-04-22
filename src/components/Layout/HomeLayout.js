import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import Feedback from '../Feedback';
import FooterToggle from '../FooterToggle';
import Footer from '../Footer';
import cx from 'classnames';


class HomeLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>
        <Header borderLess={true} />
        {this.props.children}
        <Feedback />
        <div className={cx('hidden-xs hidden-sm')}>
          <FooterToggle />
        </div>
        <div className={cx('hidden-lg', 'hidden-md')}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(HomeLayout);
