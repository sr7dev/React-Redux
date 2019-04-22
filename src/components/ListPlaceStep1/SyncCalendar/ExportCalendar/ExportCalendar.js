import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ExportCalendar.css';
import cx from 'classnames';
import {
  Button,
  FormGroup,
  Col,
  FormControl,
  Modal,
  Panel 
} from 'react-bootstrap';
import {url} from '../../../../config';

class ExportCalendar extends React.Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    listId: PropTypes.number.isRequired,
  };

  render() {
    const { showModal, close, listId } = this.props;
    const calendarURL = url + '/export-calendar?id=' + listId;

    return (
      <div>
        <Modal show={showModal} onHide={close} animation={false} className={cx(s.modalContainer, 'ContactHost')}>
          <div className={cx(s.modalTable)}>
            <div className={cx(s.modalCell)}>
              <Modal.Header className={s.modalHeading} closeButton>
                <Modal.Title>Export Calendar</Modal.Title>
              </Modal.Header>
              <Modal.Body bsClass={s.logInModalBody}>
                <Panel className={s.panelHeader}>
                  <form>
                    <div className={s.panelBody}>
                      <p className={s.introText}>
                        Copy and paste the link into other ICAL applications
                      </p>
                      <div className={s.space3}>
                         <FormGroup className={s.formGroup}>
                            <FormControl 
                              name="url"
                              type="text"
                              value={calendarURL}
                              className={s.formControlInput}
                              readOnly 
                            />
                        </FormGroup>
                      </div>
                    </div>
                  </form>
                </Panel>
              </Modal.Body>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapState = (state) => ({
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ExportCalendar)));
