import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Style
import { 
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SiteSettingsForm.css';
import Uploader from './Uploader';

class SiteSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
          <label className={s.labelText} >{label}</label>
        </Col>
        <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
          {touched && error && <span className={s.errorMessage}>{error}</span>}
          <FormControl {...input} placeholder={label} type={type} className={className} />
        </Col>
      </FormGroup>
      );
    }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    
    return (
      <FormGroup className={s.formGroup}>
        <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
          <label className={s.labelText} >{label}</label>
        </Col>
        <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
          {touched && error && <span className={s.errorMessage}>{error}</span>}
          <FormControl
            {...input}
            className={className}
            componentClass="textarea"
          >
            {children}
          </FormControl>
        </Col>
      </FormGroup>
      );
  }


  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
            <Col xs={12} sm={12} md={8} lg={8}>
              <Panel className={s.panelHeader}>
                <form onSubmit={handleSubmit(submit)}>
                  {error && <strong>{error}</strong>}
                  <FormGroup className={s.formGroup}>
                    <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                      <label className={s.labelText} >Logo</label>
                    </Col>
                    <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                      <Uploader />
                    </Col>
                  </FormGroup>
                  <Field name="logoHeight" type="text" component={this.renderFormControl} label={"Logo Height"} />
                  <Field name="logoWidth" type="text" component={this.renderFormControl} label={"Logo Width"} />
                  <Field name="siteName" type="text" component={this.renderFormControl} label={"Site Name"} />

                  <Field name="siteTitle" type="text" component={this.renderFormControl} label={"Site Title"} />
                  <Field name="metaDescription" type="text" component={this.renderFormControlTextArea} label={"Meta Description"} />
                  <Field name="facebookLink" type="text" component={this.renderFormControl} label={"Facebook URL"} />
                  <Field name="twitterLink" type="text" component={this.renderFormControl} label={"Twitter URL"} />
                  <Field name="instagramLink" type="text" component={this.renderFormControl} label={"Instagram URL"} />
                  <FormGroup className={s.formGroup}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit" disabled={submitting} >Save</Button>
                    </Col>
                  </FormGroup>
                </form> 
              </Panel>
            </Col>
          </div>
        </div>
    );
  }

}

SiteSettingsForm = reduxForm({
  form: 'SiteSettingsForm', // a unique name for this form
  validate
})(SiteSettingsForm);


export default withStyles(s)(SiteSettingsForm);
