import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
// Redux
import { connect } from 'react-redux';

import {
	Row,
	Col,
	Label
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Inbox.css';

import logoUrl from '../logo-small.jpg';

// Component
import Avatar from '../../Avatar';
import Link from '../../Link';

// Redux Action
import { readMessage } from '../../../actions/message/readMessage';

// Locale
import messages from '../../../locale/messages';


class InboxItem extends Component {
	static propTypes = {
		formatMessage: PropTypes.func,
		type: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		threadId: PropTypes.number.isRequired,
		profileId: PropTypes.number.isRequired,
		picture: PropTypes.string,
		displayName: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		startDate: PropTypes.string,
		endDate: PropTypes.string,
		sentBy: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		country: PropTypes.string.isRequired,
		read: PropTypes.bool.isRequired,
		account: PropTypes.shape({
			userId: PropTypes.string.isRequired
		}),
		readMessage: PropTypes.func.isRequired
	};

	static defaultProps = {
		createdAt: null,
		startDate: null,
		endDate: null,
		picture: null,
		status: null,
		sentBy: null,
		read: false
	}

	label(status, noStyle) {
		let style, label;
		switch (status) {
			case 'inquiry':
				label = <FormattedMessage {...messages.messageStatus1} />
				style = 'info';
				break;
			case 'preApproved':
				label = <FormattedMessage {...messages.messageStatus2} />
				style = 'primary';
				break;
			case 'declined':
				label = <FormattedMessage {...messages.messageStatus3} />
				style = 'danger';
				break;
			case 'approved':
				label = <FormattedMessage {...messages.messageStatus4} />
				style = 'success';
				break;
			case 'pending':
				label = <FormattedMessage {...messages.messageStatus5} />
				style = 'warning';
				break;
			case 'cancelledByHost':
				label = <FormattedMessage {...messages.messageStatus6} />
				style = 'danger';
				break;
			case 'cancelledByGuest':
				label = <FormattedMessage {...messages.messageStatus7} />
				style = 'danger';
				break;
			case 'intantBooking':
				label = <FormattedMessage {...messages.messageStatus8} />
				style = 'success';
				break;
			case 'confirmed':
				label = <FormattedMessage {...messages.messageStatus8} />
				style = 'success';
				break;
			case 'expired':
				label = <FormattedMessage {...messages.messageStatus9} />
				style = 'danger';
				break;
			case 'requestToBook':
				label = <FormattedMessage {...messages.messageStatus10} />
				style = 'primary';
				break;  
			case 'completed':
				label = <FormattedMessage {...messages.inboxCompleted} /> 
				style = 'success';
				break;            
		}
		if (noStyle) {
			return label;
		}
		return <Label bsStyle={style}>{label}</Label>
	}

	render() {
		const { type, threadId, profileId, picture, displayName, content, createdAt, startDate, endDate } = this.props;
		const { city, state, country, status, sentBy, read } = this.props;
		const { formatMessage } = this.props.intl;
		const { account: { userId } } = this.props;
		const { readMessage } = this.props;
		let createdDate = createdAt != null ? moment(createdAt).format('MM/DD/YYYY') : '';
		let start = startDate != null ? '(' + moment(startDate).format('MM/DD/YYYY') : '';
		let end = endDate != null ? ' - ' + moment(endDate).format('MM/DD/YYYY') + ')' : '';
		let isRead;
		if (userId !== sentBy && read === false) {
			isRead = s.threadSubjectUnread;
		}

		return (
			<li className={s.PanelBody}>
				<Row>
					<Col xs={9} sm={9} md={3} className={s.threadAuthor}>
						<Row>
							<Col md={5} className={s.threadAvatar}>
								<Avatar
									source={picture}
									height={50}
									width={50}
									title={displayName}
									className={s.profileAvatar}
									withLink
									linkClassName={s.profileAvatarLink}
									profileId={profileId}
								/>
							</Col>
							<Col xs={7} sm={7} className={cx(s.threadName, s.textTruncate)}>
								<div>{displayName}</div>
								<time className={s.threadDate}>{createdDate}</time>
							</Col>
						</Row>
					</Col>
					<Link
						to={"/message/" + threadId + "/" + type}
						className={cx(s.threadLink, s.textMuted)}
						onClick={() => readMessage(threadId, type)}
					>
						<Col xs={7} sm={7} md={5} lg={6} className={cx(s.textTruncate, s.threadBody)}>
						<span className={cx(s.threadSubject, isRead)}>{content != null ? content : this.label(status, true)}</span>
							<div className={cx(s.textMuted, s.showLg)}>
								<span>{city}, {state}, {country} {start} {end}</span>
							</div>
						</Col>
					</Link>
					<Col xs={7} sm={7} md={4} lg={3} className={s.threadLabel}>
						<Row>
							<Col sm={12} md={6} >
								{this.label(status)}
							</Col>
						</Row>
					</Col>
				</Row>
			</li>
		);
	}
}

const mapState = (state) => ({
	account: state.account.data
});

const mapDispatch = {
	readMessage
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(InboxItem)));
