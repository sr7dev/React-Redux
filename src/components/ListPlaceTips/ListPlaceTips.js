import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListPlaceTips.css';
import {
  Grid,
  Row,
  Col } from 'react-bootstrap';

// Component
import ListPlaceStep1 from '../../components/ListPlaceStep1';

// Translation
import { injectIntl } from 'react-intl';

class ListPlaceTips extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <Col xs={12} sm={5} md={5} lg={5} xsHidden>
        <div className={s.helpPanelContainer}>
          <div className={s.helpPanel}>
            <div className={s.helpPanelText}>
              <p>
                <span className={s.helpPanelTextTitle}>Entire place</span>
                <span>Guests will rent the entire place. Includes in-law units.</span>
              </p>
              <p>
                <span className={s.helpPanelTextTitle}>Entire place</span>
                <span>Guests will rent the entire place. Includes in-law units.</span>
              </p>
              <p>
                <span className={s.helpPanelTextTitle}>Entire place</span>
                <span>Guests will rent the entire place. Includes in-law units.</span>
              </p>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

export default withStyles(s)(ListPlaceTips);

