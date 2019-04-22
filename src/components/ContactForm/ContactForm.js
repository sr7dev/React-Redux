// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux Form
import { Field, reduxForm, reset } from 'redux-form';

 import validate from './validate';

// Locale
import messages from '../../locale/messages';

// Redux
import { connect } from 'react-redux';

import ReCAPTCHA from 'react-google-recaptcha';

import { sendEmail } from '../../core/email/sendEmail';

import { toastr } from 'react-redux-toastr';

import { emailConfig, googleCaptcha } from '../../config';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ContactForm.css';
import {
    Button,
    Form,
    Grid,
    Row, FormGroup,
    Col,
    ControlLabel,
    FormControl,
} from 'react-bootstrap';

// Internal Components
import Loader from '../Loader';

class ContactForm extends Component {
    static propTypes = {
        formatMessage: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            contactLoading: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(values, dispatch) {
        let content = {
            phoneNumber: values.phoneNumber,
            name: values.name,
            email:values.email,
            ContactMessage: values.ContactMessage
        };
        this.setState({
            contactLoading: true
        })
        let email = emailConfig.email;
        const { status, response } = await sendEmail(email, 'contact', content);
        this.setState({
            contactLoading: false
        })
        if (status === 200) {
            toastr.success("Success!", "Your email has been sent.");
        } else {
            toastr.error("Error!", "Sorry, something went wrong. Please try again!");
        }
        dispatch(reset('ContactForm'));
        grecaptcha.reset();
    }

    renderFormControl = ({ input, label, type, meta: { touched, error }, className, isDisabled }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <FormControl {...input} placeholder={label} type={type} className={className} disabled={isDisabled} />
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        )
    }

    renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <FormControl
                    {...input}
                    className={className}
                    componentClass="textarea"
                >
                    {children}
                </FormControl>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        )
    }

    renderCaptcha = ({ input, label, type, meta: { touched, error }, className, isDisabled }) => {
        const { formatMessage } = this.props.intl;
        let siteKey = googleCaptcha.sitekey;
        return (
            <div>
                <ReCAPTCHA
                    sitekey={siteKey}
                    onChange={input.onChange}
                />
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        )
    }

    render() {
        const { error, handleSubmit, submitting, dispatch, pristine } = this.props;
        const { formatMessage } = this.props.intl;
        const { contactLoading } = this.state;
        const title = <h3>{formatMessage(messages.Required)}</h3>;

        return (<div className={s.formContentBox}>
            <div className={s.formContainerHeader}>
                <h2 className={s.captionText}><FormattedMessage {...messages.contactForm} /> </h2>
            </div>
            <div className={s.formContainer}>
                {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <form onSubmit={handleSubmit(this.handleClick)} >
                    <Row className={s.formGroup}>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <label className={s.labelText} >{formatMessage(messages.Nameincontact)}</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Field name="name"
                                type="text"
                                component={this.renderFormControl}
                                label={formatMessage(messages.Nameincontact)}
                                className={s.formControlInput}
                            />
                        </Col>
                    </Row>
                    <Row className={s.formGroup}>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <label className={s.labelText} >{formatMessage(messages.email)}</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Field name="email"
                                type="text"
                                component={this.renderFormControl}
                                label={formatMessage(messages.email)}
                                className={s.formControlInput}
                            />
                        </Col>
                    </Row>
                    <Row className={s.formGroup}>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <label className={s.labelText} >{formatMessage(messages.phoneNumber)}</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Field name="phoneNumber"
                                type="text"
                                component={this.renderFormControl}
                                label={formatMessage(messages.phoneNumber)}
                                className={s.formControlInput}
                            />
                        </Col>
                    </Row>
                    <Row className={s.formGroup}>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <label className={s.labelText} >{formatMessage(messages.ContactMessage)}</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Field name="ContactMessage"
                                type="text"
                                component={this.renderFormControlTextArea}
                                label={formatMessage(messages.ContactMessage)}
                                className={s.formControlInput}
                            />
                        </Col>
                    </Row>
                    
                    <Row className={s.formGroup}>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Field name="reCaptcha"
                                component={this.renderCaptcha}
                            />
                        </Col>
                    </Row>
                    <Row className={s.formGroup}>
                        <Col xs={12} sm={12} md={12} lg={12} className={s.spaceTop3}>
                            <Loader
                                type={"button"}
                                buttonType={"submit"}
                                className={cx(s.button, s.btnPrimary, s.btnlarge)}
                                disabled={submitting}
                                show={contactLoading}
                                label={formatMessage(messages.sendmail)}
                            />
                        </Col>
                    </Row>
                </form>
            </div>
            </div>
        )
    }

}

ContactForm = reduxForm({
    form: 'ContactForm', // a unique name for this form
    validate
})(ContactForm);


const mapState = (state) => ({
    
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ContactForm)));
