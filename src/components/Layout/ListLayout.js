import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import ListHeader from '../Header/List';
import Footer from '../Footer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    step: PropTypes.number.isRequired,
    formPage: PropTypes.string.isRequired
  };

  render() {
    const { step, formPage } = this.props;
    
    return (
      <div>
        <ListHeader step={step} formPage={formPage} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(Layout);