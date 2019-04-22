import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux Form
import { Field, reduxForm } from 'redux-form';

import {
  Button,
  Form,
  Grid,
  Row, FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Panel,
  Label,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';

// Component
import CountryList from '../../CountryList';

// Helpers
import validate from './validate';

// Locale
import messages from '../../../locale/messages';

class PayoutBillingDetails extends Component {
    static propTypes = {
      handleSubmit: PropTypes.func.isRequired,
      formatMessage: PropTypes.func,
    };

    renderField = ({ input, label, type, meta: { touched, error, dirty } }) => {
      const { formatMessage } = this.props.intl;
      return (
        <div className={s.space1}>
          <label className={s.labelText}>{label}</label>
          <FormGroup className={s.formGroup}>
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            <FormControl {...input} componentClass="input" className={cx(s.formControlInput)} />
          </FormGroup>
        </div>
      );
    }

    renderCountryList = ({ input, label, meta: { touched, error }, children, className }) => {
      const { formatMessage } = this.props.intl;
      return (
      	<div className={s.space1}>
          <label className={s.labelText}><FormattedMessage {...messages.country} /></label>
	    	{touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
	    	<FormGroup className={s.formGroup}>
      			<CountryList input={input} className={className} isEmptyFirst />
      		</FormGroup>
      	</div>
      );
    }

    render() {
    const { handleSubmit } = this.props;
    const { formatMessage } = this.props.intl;

        return (
        	<form onSubmit={handleSubmit}>
	            <Panel
	              className={s.panelHeader}
	              header={formatMessage(messages.addPayout)}
	              footer={
	                <Button
	                  className={cx(s.button, s.btnlarge, s.btnPrimary)}
	                  type="submit"
                    ><FormattedMessage {...messages.next} />
	                </Button>
	              }
	            >
	              <div className={s.panelBody}>
	                <Field name="country" component={this.renderCountryList} className={s.formControlSelect} />
	                <Field name="address1" component={this.renderField} label={formatMessage(messages.address1)} />
	                <Field name="address2" component={this.renderField} label={formatMessage(messages.address2)} />
	                <Field name="city" component={this.renderField} label={formatMessage(messages.city)} />
	                <Field name="state" component={this.renderField} label={formatMessage(messages.state)} />
	                <Field name="zipcode" component={this.renderField} label={formatMessage(messages.zipCode)} />
	              </div> 
	            </Panel>
            </form>
        );
    }
}

PayoutBillingDetails = reduxForm({
  form: 'PayoutForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(PayoutBillingDetails);

export default injectIntl(withStyles(s)(PayoutBillingDetails));
