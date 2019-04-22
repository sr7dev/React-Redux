import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

// Component
import Avatar from '../../Avatar';
import Link from '../../Link';

// Redux Action
import {readMessage} from '../../../actions/message/readMessage';

class InboxItem extends Component {
    static propTypes = { 
    	type: PropTypes.string.isRequired,
    	status: PropTypes.string,
    	threadId: PropTypes.number.isRequired,
    	profileId: PropTypes.number.isRequired,
    	picture: PropTypes.string,
    	displayName: PropTypes.string.isRequired,
    	content: PropTypes.string,
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

    render() {
    	const { type, threadId, profileId, picture, displayName, content, createdAt, startDate, endDate } = this.props;
    	const { city, state, country, status, sentBy, read } = this.props;
    	let createdDate = createdAt != null ? moment(createdAt).format('MM/DD/YYYY') : '';
    	let start = startDate != null ? '(' + moment(startDate).format('MM/DD/YYYY') : '';
    	let end = endDate != null ? ' - ' +moment(endDate).format('MM/DD/YYYY') + ')' : '';
		const { readMessage } = this.props;
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
		              <Col xs={7} sm={7} md={5} lg={6} className={cx(s.textTruncate,s.threadBody)}>
		                <span className={s.threadSubject}>{content}</span>
		                <div className={cx(s.textMuted, s.showLg)}>
		                  <span>{city}, {state}, {country} {start} {end}</span>
		                </div>
		              </Col>
		            </Link>
		            <Col xs={7} sm={7} md={4} lg={3} className={s.threadLabel}>
		              <Row>
		                <Col sm={12} md={6} >
		                  {status}
		                </Col>
		              </Row>
		            </Col>
		        </Row>
	        </li>
        );
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    readMessage
};

export default withStyles(s) (connect(mapState, mapDispatch)(InboxItem));
