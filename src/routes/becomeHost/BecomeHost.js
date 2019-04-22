import React from 'react';
import PropTypes from 'prop-types';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BecomeHost.css';
import {
  Grid,
  Row,
  Col } from 'react-bootstrap';

// Component
import ListPlaceStep1 from '../../components/ListPlaceStep1';

// Translation
import { injectIntl } from 'react-intl';

import ListPlaceTips from '../../components/ListPlaceTips';

class BecomeHost extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    mode: PropTypes.string,
    listId: PropTypes.number,
    formBaseURI: PropTypes.string,
    mode: PropTypes.string
  };

  render() {
    const { title, formPage, formBaseURI, mode, listId } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <ListPlaceStep1 
            listId={listId}
            formPage={formPage} 
            formBaseURI={formBaseURI} 
            mode={mode} 
          />   
        </div>
      </div>
    );
  }
}


export default withStyles(s)(BecomeHost);
