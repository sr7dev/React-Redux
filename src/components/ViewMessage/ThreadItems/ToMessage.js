import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

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

// Component
import Avatar from '../../Avatar';

class ToMessage extends Component {
    static propTypes = {
      profileId: PropTypes.number.isRequired,
      picture: PropTypes.string,
      displayName: PropTypes.string.isRequired,
      content: PropTypes.string,
      createdAt: PropTypes.string.isRequired
    };

    static defaultProps = {
        createdAt: null
    };

    render() {
        const { profileId, picture, displayName, content, createdAt } = this.props;
        let date = createdAt != null ? moment(createdAt).format('D MMM YYYY') : '';

        return (
            <Row className={cx(s.space5)}>
	            <Col xs={8} sm={8} md={9} lg={10}>
	              <Panel className={cx(s.panelDark, s.panelBubble, s.panelText, s.panelBubbleRight)}>
	                <span>{content}</span>
	                <div className={cx(s.timeText,s.spaceTop2)}>
	                   <span>{date}</span>
	                </div>
	              </Panel>
	            </Col>
	            <Col xs={4} sm={4} md={3} lg={2} className={'text-right'}>
	              <div className={s.profileAvatarSection}>
	                <Avatar
                    source={picture}
                    height={70}
                    width={70}
                    title={displayName}
                    className={s.profileAvatar}
                    withLink
                    linkClassName={s.profileAvatarLink}
                    profileId={profileId}
                  />
	               </div>
	            </Col>
          	</Row>
        );
    }
}

export default withStyles(s)(ToMessage);