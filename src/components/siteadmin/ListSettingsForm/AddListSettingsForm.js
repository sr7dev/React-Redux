// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Redux Form
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Translation
import { injectIntl } from 'react-intl';
import messages from './messages';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListSettingsForm.css';
import {
  Button,
  FormGroup,
  FormControl } from 'react-bootstrap';

class AddListSettingsForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
  };

  constructor(props){
    super(props);
    this.state = {
      fieldType: null
    }
  }

  componentWillMount () {
    const { fieldType } = this.props;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
  }

  componentWillReceiveProps (nextProps) {
    const { fieldType } = nextProps;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const {formatMessage} = this.props.intl;
    return (
    <div>
      {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      <FormControl {...input} placeholder={label} type={type} className={className} />
    </div>
  )}

  render () {
    const { error, handleSubmit, submitting, dispatch, initialValues } = this.props;
    const {formatMessage} = this.props.intl;
    const { fieldType } = this.state;
    return (
      <form onSubmit={handleSubmit(submit)}>
        {error && <strong>{formatMessage(error)}</strong>}
        <FormGroup className={s.formGroup}>
          <Field
            name="itemName"
            type="text"
            component={this.renderFormControl}
            label={formatMessage(messages.addNew)}
            className={cx(s.formControlInput, s.space3)}
            />
        </FormGroup>

        {
          fieldType=="numberType" && <div>
            <FormGroup className={s.formGroup}>
              <Field
                name="otherItemName"
                type="text"
                component={this.renderFormControl}
                label={formatMessage(messages.addOtherItem)}
                className={s.formControlInput}
                />
            </FormGroup>
            <FormGroup className={s.formGroup}>
              <Field
                name="startValue"
                type="text"
                component={this.renderFormControl}
                label={formatMessage(messages.startValue)}
                className={s.formControlInput}
                />
            </FormGroup>

            <FormGroup className={s.formGroup}>
              <Field
                name="endValue"
                type="text"
                component={this.renderFormControl}
                label={formatMessage(messages.endValue)}
                className={s.formControlInput}
                />
            </FormGroup>
          </div>
        }

        <FormGroup className={s.formGroup}>
          <Button className={cx(s.button, s.btnPrimary)} bsSize="large" block type="submit" disabled={submitting}>
            {formatMessage(messages.add)}
          </Button>
        </FormGroup>
      </form>
    )
  }

}

AddListSettingsForm = reduxForm({
  form: "AddListSettingsForm", // a unique name for this form
  validate,
})(AddListSettingsForm);

const mapState = (state) => ({
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(AddListSettingsForm)));
