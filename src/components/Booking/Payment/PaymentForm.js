import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

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
import * as FontAwesome from 'react-icons/lib/fa';
import logoUrl from './logo-small.jpg';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';

// Helpers
import validate from './validate';
import submit from './submit';

// Component
import HouseRules from './HouseRules';
import Loader from '../../Loader';
import Card from '../Card';
// Locale
import messages from '../../../locale/messages';

class PaymentForm extends Component {
  static propTypes = {
    houseRules: PropTypes.arrayOf(PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string.isRequired
      })
    })),
    hostDisplayName: PropTypes.string.isRequired,
    allowedPersonCapacity: PropTypes.number.isRequired,
    initialValues: PropTypes.shape({
      listId: PropTypes.number.isRequired,
      listTitle: PropTypes.string.isRequired,
      hostId: PropTypes.string.isRequired,
      guestId: PropTypes.string.isRequired,
      checkIn: PropTypes.object.isRequired,
      checkOut: PropTypes.object.isRequired,
      guests: PropTypes.number.isRequired,
      basePrice: PropTypes.number.isRequired,
      cleaningPrice: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      weeklyDiscount: PropTypes.number,
      monthlyDiscount: PropTypes.number,
      paymentType: PropTypes.number
    }).isRequired,
    paymentCurrencyList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isPayment: PropTypes.bool.isRequired
    })),
    paymentLoading: PropTypes.bool,
    formatMessage: PropTypes.func,
  };

  static defaultProps = {
    paymentCurrencyList: [],
    paymentLoading: false
  };

  constructor(props) {
    super(props);
    this.renderpaymentCurrencies = this.renderpaymentCurrencies.bind(this);
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className, disabled }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl disabled={disabled} componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    )
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
        >
          {children}
        </FormControl>
      </FormGroup>
    );
  }

  renderGuests(personCapacity) {
    let rows = [];
    for (let i = 1; i <= personCapacity; i++) {
      rows.push(<option key={i} value={i}>{i} {i > 1 ? 'guests' : 'guest'}</option>);
    }
    return rows;
  }

  renderpaymentCurrencies() {
    const { paymentCurrencyList } = this.props;
    let rows = [];

    if (paymentCurrencyList != null && paymentCurrencyList.length > 0) {
      paymentCurrencyList.map((item, index) => {
        if (item.isEnable && item.isPayment) {
          rows.push(<option key={index} value={item.symbol}>{item.symbol}</option>);
        }
      })
    }
    return rows;
  }

  render() {
    const { hostDisplayName, houseRules, allowedPersonCapacity, paymentLoading } = this.props;
    const { handleSubmit, submitting, error, pristine, paymentType } = this.props;
    const { formatMessage } = this.props.intl;
    console.log('paymentType', paymentType);
    return (
      <div className={cx(s.bookItPanel, s.spaceTop2)}>
        <form onSubmit={handleSubmit(submit)}>
          <Row>
            <Col md={10} className={cx(s.textLeft)}>
              <div className={s.h3}>
                1.<FormattedMessage {...messages.aboutYourTrip} />
              </div>
              <div className={cx(s.bookItDetails, s.spaceTop2, s.space4)}>
                <span><FormattedMessage {...messages.whoComing} /></span>
                <Row className={s.spaceTop2}>
                  <Col md={12} lg={5}>
                    <Field name="guests" component={this.renderFormControlSelect} className={s.formControlSelect} >
                      {
                        this.renderGuests(allowedPersonCapacity)
                      }
                    </Field>
                  </Col>
                </Row>
              </div>
              <div >
                <span><FormattedMessage {...messages.sayHello} />:</span>
              </div>
              <div>
                <Field
                  className={s.textArea}
                  name="message"
                  component={this.renderFormControlTextArea}
                  label={formatMessage(messages.descriptionInfo)}
                />
              </div>
              {
                houseRules.length > 0 && <div className={s.space4}>
                  <HouseRules
                    hostDisplayName={hostDisplayName}
                    houseRules={houseRules}
                  />
                </div>
              }

            </Col>
            <Col md={10} className={cx(s.textLeft)}>
              <section>
                <header className={s.paymentHeader}>
                  <Row>
                    <Col md={10} className={cx(s.textLeft)}>
                      <h3 className={s.pullLeft}>2.<FormattedMessage {...messages.payment} /></h3>
                    </Col>
                  </Row>
                </header>
              </section>
              <Row className={s.space4}>
                <Col xs={12}>
                  <span className={s.textLight}>
                    <FormattedMessage {...messages.paymentInfo} />
                  </span>
                </Col>
              </Row>
              <Row className={s.space4}>
                <Col xs={12} sm={12} md={12} lg={12} className={s.countryName}>
                  <span className={s.textRegular}>
                    <Field name="paymentType" component="input" type="radio" value="2" className={s.cursorPointer} /> <FormattedMessage {...messages.creditCard} />
                  </span>
                </Col>
                <Col xs={12} sm={12} md={10} lg={10}>
                  <Card paymentType={paymentType} />
                </Col>
              </Row>  
              <Row className={s.space4}>
                <Col xs={12} sm={12} md={12} lg={12} className={s.countryName}>
                  <span className={s.textRegular}>
                    <Field name="paymentType" component="input" type="radio" value="1" className={s.cursorPointer} /> <FormattedMessage {...messages.payPal} />
                  </span>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <div className={s.countryName}>
                    <span>
                      <FormattedMessage {...messages.paymentCurrency} />
                    </span>
                  </div>
                  <div className={s.selectContainer}>
                    <Field name="paymentCurrency" disabled={paymentType==2} component={this.renderFormControlSelect} className={s.formControlSelect} >
                      <option value="">{formatMessage(messages.chooseCurrency)}</option>
                      {
                        this.renderpaymentCurrencies()
                      }
                    </Field>
                  </div>
                </Col>
              </Row>
              <Row className={s.space4}>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <span className={s.textLight}>
                    <FormattedMessage {...messages.loginInfo} />
                  </span>
                </Col>
              </Row>
              <Row className={s.space4}>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Loader
                    type={"button"}
                    buttonType={"submit"}
                    className={cx(s.button, s.btnPrimary, s.btnlarge)}
                    disabled={pristine || submitting || error}
                    show={paymentLoading}
                    label={formatMessage(messages.payNow)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

PaymentForm = reduxForm({
  form: 'PaymentForm', // a unique name for this form
  validate
})(PaymentForm);

// Decorate with connect to read form values
const selector = formValueSelector('PaymentForm'); // <-- same as form name

const mapState = (state) => ({
  paymentCurrencyList: state.currency.availableCurrencies,
  paymentLoading: state.book.paymentLoading,
  paymentType: selector(state, 'paymentType')
});

const mapDispatch = {

};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PaymentForm)));
