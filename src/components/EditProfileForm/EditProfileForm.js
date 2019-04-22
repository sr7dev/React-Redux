// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux Form
import { Field, reduxForm, change } from 'redux-form';

import submit from './submit';
import validate from './validate';

// Locale
import messages from '../../locale/messages';

// Redux
import { connect } from 'react-redux';

// Helper
import PopulateData from '../../helpers/populateData';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './EditProfileForm.css';
import {
  Button,
  Form,
  Grid,
  Row, FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Panel
} from 'react-bootstrap';

// Internal Components
import PhoneVerificationModal from '../PhoneVerificationModal';

class EditProfileForm extends Component {

  static propTypes = {
    loadAccount: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      dateOfBirthData: {}
    }
  }

  componentDidMount() {
    const { change, initialValues } = this.props;
    let loggedinEmail;
    if (initialValues && initialValues.email) {
      loggedinEmail = initialValues.email;
    }
    change('loggedinEmail', loggedinEmail);
  }

  componentWillReceiveProps() {
    const { change, initialValues } = this.props;
    let loggedinEmail;
    if (initialValues && initialValues.email) {
      loggedinEmail = initialValues.email;
    }
    change('loggedinEmail', loggedinEmail);
  }

  componentWillMount() {
    let now = new Date();
    let currentYear = now.getFullYear();
    let years = PopulateData.generateData(1920, currentYear, "desc");
    let days = PopulateData.generateData(1, 31);
    let months = PopulateData.generateData(0, 11);
    this.setState({
      dateOfBirthData: {
        years: years,
        months: months,
        days: days
      }
    });
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
        >
          {children}
        </FormControl>
      </div>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, isDisabled }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl {...input} placeholder={label} type={type} className={className} disabled={isDisabled} />
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    )
  }


  render() {

    const { error, handleSubmit, submitting, dispatch, loadAccount, base, availableCurrencies, initialValues } = this.props;
    const { formatMessage } = this.props.intl;
    const { dateOfBirthData } = this.state;
    const title = <h3>{formatMessage(messages.Required)}</h3>;
    return (
      <div>
        {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <Panel className={s.panelHeader} header={title}>
          <Form onSubmit={handleSubmit(submit)}>
            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.firstName)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <Field name="firstName"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.firstName)}
                  className={s.formControlInput}
                />
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.lastName)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <Field name="lastName"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.lastName)}
                  className={s.formControlInput}
                />
                <p className={s.labelText}>{formatMessage(messages.lastNameInfo)}</p>
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.iAm)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <div className={s.select}>
                  <Field name="gender" className={s.formControlSelect} component={this.renderFormControlSelect} >
                    <option value="">{formatMessage(messages.gender)}</option>
                    <option value="Male">{formatMessage(messages.genderMale)}</option>
                    <option value="Female">{formatMessage(messages.genderFemale)}</option>
                    <option value="Other">{formatMessage(messages.genderOther)}</option>
                  </Field>
                </div>
                <p className={s.labelText}>{formatMessage(messages.genderInfo)}</p>
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.dateOfBirth)}</label>
              </Col>

              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <div className={s.select}>
                  <Field name="month" className={s.formControlSelect} component={this.renderFormControlSelect} >
                    <option value="">{formatMessage(messages.month)}</option>
                    {
                      dateOfBirthData.months.map((item, key) => {
                        return (
                          <option key={key} value={item}>{item + 1}</option>
                        )
                      })
                    }
                  </Field>
                </div>

                <div className={s.select}>
                  <Field name="day" className={s.formControlSelect} component={this.renderFormControlSelect} >
                    <option value="">{formatMessage(messages.day)}</option>
                    {
                      dateOfBirthData.days.map((item, key) => {
                        return (
                          <option key={key} value={item}>{item}</option>
                        )
                      })
                    }
                  </Field>
                </div>

                <div className={cx(s.select, s.smSpace)}>
                  <Field name="year" className={s.formControlSelect} component={this.renderFormControlSelect} >
                    <option value="">{formatMessage(messages.year)}</option>
                    {
                      dateOfBirthData.years.map((item, key) => {
                        return (
                          <option key={key} value={item}>{item}</option>
                        )
                      })
                    }
                  </Field>
                </div>

              </Col>

            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.email)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <Field name="email"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.email)}
                  className={s.formControlInput}
                />
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.phoneNumber)}</label>
              </Col>
              <Col xs={12} sm={9} md={9} lg={9}>
                <PhoneVerificationModal />
                <p className={s.labelText}>{formatMessage(messages.phoneNumberInfo)}</p>
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.preferredLanguage)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <div className={s.select}>
                  <Field name="preferredLanguage" className={s.formControlSelect} component={this.renderFormControlSelect} >
                    <option value="">Choose Language</option>
                    <option value="id">Bahasa Indonesia</option>
                    <option value="ms">Bahasa Melayu</option>
                    <option value="ca">Català</option>
                    <option value="da">Dansk</option>
                    <option value="de">Deutsch</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="el">Eλληνικά</option>
                    <option value="fr">Français</option>
                    <option value="it">Italiano</option>
                    <option value="hu">Magyar</option>
                    <option value="nl">Nederlands</option>
                    <option value="no">Norsk</option>
                    <option value="pl">Polski</option>
                    <option value="pt">Português</option>
                    <option value="fi">Suomi</option>
                    <option value="sv">Svenska</option>
                    <option value="tr">Türkçe</option>
                    <option value="is">Íslenska</option>
                    <option value="cs">Čeština</option>
                    <option value="ru">Русский</option>
                    <option value="th">ภาษาไทย</option>
                    <option value="zh">中文 (简体)</option>
                    <option value="zh-TW">中文 (繁體)</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                  </Field>
                  <p className={s.labelText}>{formatMessage(messages.preferredLanguageInfo)}</p>
                </div>
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.preferredCurrency)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <div className={s.select}>

                  <Field name="preferredCurrency" className={s.formControlSelect} component={this.renderFormControlSelect} >
                    <option value="">{formatMessage(messages.chooseCurrency)}</option>
                    {
                      availableCurrencies.map((currency, key) => {
                        if (currency.isEnable === true) {
                          return <option key={key} value={currency.symbol}>{currency.symbol}</option>
                        }
                      })
                    }
                  </Field>
                  <p className={s.labelText}>{formatMessage(messages.preferredCurrencyInfo)}</p>
                </div>

              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.liveLocation)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <Field name="location"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.liveLocation)}
                  className={s.formControlInput}
                  placeholder="e.g. Paris, France /Brooklyn, NY, IL"
                />
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.info)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <Field name="info"
                  component={this.renderFormControlTextArea}
                  className={s.formControlInput}
                />
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col xs={12} sm={12} md={12} lg={12} className={s.spaceTop3}>
                <Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit" disabled={submitting}
                >
                  {formatMessage(messages.save)}
                </Button>
              </Col>
            </Row>
          </Form>
        </Panel>
      </div>
    )
  }

}
EditProfileForm = reduxForm({
  form: 'EditProfileForm', // a unique name for this form
  validate,
})(EditProfileForm);
const mapState = (state) => ({
  initialValues: state.account.data,
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base
});
const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(EditProfileForm)));
