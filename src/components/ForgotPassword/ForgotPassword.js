import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ForgotPassword.css';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Col,
  Modal 
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeForgotPasswordModal, openLoginModal } from '../../actions/modalActions';

// Components
import ForgotPasswordForm from './ForgotPasswordForm';

// Locale
import messages from '../../locale/messages';

class ForgotPassword extends Component {
  static propTypes = {
    closeForgotPasswordModal: PropTypes.func,
    forgotModal: PropTypes.bool,
    openLoginModal: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  render() {
    const { closeForgotPasswordModal, openLoginModal, forgotModal } = this.props;

    return (
      <div>
        <Modal show={forgotModal} animation={false} onHide={closeForgotPasswordModal} dialogClassName={cx(s.logInModalContainer,"loginModal")} >
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.forgotPassword} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <ForgotPasswordForm openLoginModal={openLoginModal} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}


const mapState = (state) => ({
  forgotModal: state.modalStatus.isForgotPasswordOpen,
});

const mapDispatch = {
  closeForgotPasswordModal,
  openLoginModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(ForgotPassword));
