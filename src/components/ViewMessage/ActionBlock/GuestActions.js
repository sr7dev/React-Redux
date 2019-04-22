import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

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
	Label
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import * as FontAwesome from 'react-icons/lib/fa';

import {bookingProcess} from '../../../actions/booking/bookingProcess';

// Locale
import messages from '../../../locale/messages';

// Component
import CountDown from '../../CountDown'; 
import Link from '../../Link';

class GuestActions extends Component {
    static propTypes = {
    	actionType: PropTypes.string.isRequired,
        hostDisplayName: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        personCapacity: PropTypes.number.isRequired,
        listId: PropTypes.number.isRequired,
        reservationId: PropTypes.number,
        formatMessage: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.preBook = this.preBook.bind(this);
    }

    preBook(){
        const { bookingProcess, listId, startDate, endDate, personCapacity } = this.props;
        const preApprove = true;
        bookingProcess(listId, personCapacity, startDate, endDate, preApprove)
    }

    // Inquiry
    inquiry(hostDisplayName){
        const { listId } = this.props;
    	return (
            <Panel className={cx(s.space5, s.contextPadding)}>
                <h4><strong><FormattedMessage {...messages.messageAction1} /> {hostDisplayName} <FormattedMessage {...messages.messageAction2} /></strong></h4>
            	<p className={s.spaceTop2}>
                    <FormattedMessage {...messages.messageActionInfo} />
            	</p>
	            <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop2, s.noPadding)}>
                    <Link to={"/rooms/" + listId} className={cx(s.linkBtn, s.btnPrimary)}><FormattedMessage {...messages.RequestToBook} /></Link>
	            </Col>
         	</Panel>
        );
    }

    // Request to book
    requestToBook(hostDisplayName){
        const {reservationId} = this.props;
    	return (
            <Panel className={cx(s.space5, s.contextPadding)}>
                <h4><strong><FormattedMessage {...messages.messageAction3} /> {hostDisplayName} <FormattedMessage {...messages.messageAction4} /></strong></h4>
            	<p className={s.spaceTop2}>
                    <FormattedMessage {...messages.cancelInfo} />
            	</p>
	            <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop2, s.noPadding)}>
	                <Link to={"/cancel/" + reservationId + "/guest" } className={cx(s.linkBtn, s.btnPrimary)}>
                        <FormattedMessage {...messages.cancelReservation} />
                    </Link>
	            </Col>
         	</Panel>
        );
    }

    // Request to book/ Inquiry declined
    declined(){
    	return (
          <Panel className={cx(s.space5, s.contextPadding)}>
		    <h4><strong><FormattedMessage {...messages.requestDeclined} /></strong></h4>
            <p className={s.spaceTop2}><FormattedMessage {...messages.guestDeclinedInfo} /></p>
		  </Panel>
        );
    }

    // Request to book / Pre-approved by host
    approved(hostDisplayName){
        const { createdAt } = this.props;
        let startDate = moment();
        let next24Hours = moment(createdAt).add(23, 'hours').add(59, 'minutes');
        let distance = Number(next24Hours - startDate);
        let options = { endDate: next24Hours};
        if(distance < 0){
            return this.expired();
        } else {
            return (
                <Panel className={cx(s.space5, s.contextPadding)}>
                    <h4><strong><FormattedMessage {...messages.requestApprovedAction1} /> {hostDisplayName} <FormattedMessage {...messages.messageAction4} /></strong></h4>
                    <p className={s.spaceTop2}>
                        <FormattedMessage {...messages.requestTimeInfo1} /> <CountDown options={options} /> <FormattedMessage {...messages.requestTimeInfo2} />
                    </p>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop2, s.noPadding)}>
                      <Button className={s.btnPrimary} onClick={() => this.preBook()}>
                        <FormattedMessage {...messages.book} />
                      </Button>
                    </Col>
                </Panel>
            );
        }    	
    }

    // Booking confirmed by host/ instant booking
    bookingConfirmed(hostDisplayName){
        const {reservationId} = this.props;
    	return (
            <Panel className={cx(s.space5, s.contextPadding)}>
                <h4>
                    <strong><FormattedMessage {...messages.bookingConfirmedInfo1} /> {hostDisplayName} <FormattedMessage {...messages.messageAction4} />
                    </strong>
                </h4>
            	<p className={s.spaceTop2}>
                    <FormattedMessage {...messages.bookingCanceledInfo} /> 
            	</p>
	            <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop2, s.noPadding)}>
	                <Link to={"/cancel/" + reservationId + "/guest" } className={cx(s.linkBtn, s.btnPrimary)}>
                        <FormattedMessage {...messages.cancelReservation} />
                    </Link>
	            </Col>
         	</Panel>
        );
    }

    // Pre-approved or approved by host is expired
    expired() {
        const { listId } = this.props;
    	return (
            <Panel className={cx(s.space5, s.contextPadding)}>
                <h4><strong><FormattedMessage {...messages.bookingExpiredTitle} /></strong></h4>
            	<p className={s.spaceTop2}>
                    <FormattedMessage {...messages.bookingExpiredInfo} /> 
            	</p>
	            <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop2, s.noPadding)}>
                    <Link to={"/rooms/" + listId} className={cx(s.linkBtn, s.btnPrimary)}>
                        <FormattedMessage {...messages.gotoListing} />
                    </Link>
	            </Col>
         	</Panel>
        );
    }

    // Booking is cancelled by host
    cancelled() {
    	return (
            <Panel className={cx(s.space5, s.contextPadding)}>
                <h4><strong><FormattedMessage {...messages.bookingRequestCancel1} /></strong></h4>
            	<p className={s.spaceTop2}>
                    <FormattedMessage {...messages.bookingRequestCancel2} />  
            	</p>
         	</Panel>
        );
    }

    completed() {
        return (
            <Panel className={cx(s.space5, s.contextPadding)}>
                <h4><strong>Trip is completed</strong></h4>
                <p className={s.spaceTop2}>
                    Your trip is completed.  
                </p>
            </Panel>
        );
    }

    render() {
    	const { actionType, hostDisplayName } = this.props;

    	if(actionType === 'inquiry'){
    		return this.inquiry(hostDisplayName);
    	} else if(actionType === 'preApproved') {
    		return this.approved(hostDisplayName);
    	} else if(actionType === 'declined') {
    		return this.declined();
    	} else if(actionType === 'intantBooking' || actionType === 'approved') {
    		return this.bookingConfirmed(hostDisplayName);
    	} else if(actionType === 'requestToBook') {
    		return this.requestToBook(hostDisplayName);
    	} else if(actionType === 'expired') {
    		return this.expired();
    	} else if(actionType === 'cancelledByHost' || actionType === 'cancelledByGuest') {
    		return this.cancelled();
    	} else if(actionType === 'completed') {
            return this.completed();
        }
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
  bookingProcess,
};

export default withStyles(s)(connect(mapState, mapDispatch)(GuestActions));