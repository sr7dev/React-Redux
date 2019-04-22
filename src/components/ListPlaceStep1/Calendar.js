// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl } from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Internal Component
import DayCalendar from '../../components/DayCalendar';

import updateStep3 from './updateStep3';

class Calendar extends Component {

  static propTypes = {
    previousPage: PropTypes.func,
    nextPage: PropTypes.func,
    disabledDates: PropTypes.array,
    blockedDates: PropTypes.array,
  };

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage } = this.props;
    const { disabledDates, blockedDates } = this.props;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={12} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}><FormattedMessage {...messages.calendar} /></h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                    <DayCalendar 
                      formName={"ListPlaceStep3"} 
                      disabledDates={disabledDates} 
                      blockedDates={blockedDates}
                    />
                  </FormGroup>
                </div>

                <hr className={s.horizontalLineThrough} />

                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("min-max-nights")}>
                      <FormattedMessage {...messages.back} />
                    </Button>
                    <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("pricing")}>
                      <FormattedMessage {...messages.next} />
                    </Button>
                  </Col>
                </FormGroup>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Calendar = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(Calendar);

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep3'); // <-- same as form name

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  disabledDates: selector(state, 'disabledDates'),
  blockedDates: selector(state, 'blockedDates'),
});

const mapDispatch = {
};

export default injectIntl(withStyles(s) (connect(mapState, mapDispatch)(Calendar)));
