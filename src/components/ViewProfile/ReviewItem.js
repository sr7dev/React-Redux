import React, {Component} from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewProfile.css';
import * as FontAwesome from 'react-icons/lib/fa';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Component
import ResponseItem from './ResponseItem';
import Avatar from '../Avatar';
import Link from '../Link';

// Locale
import messages from '../../locale/messages';

class ReviewItem extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.func,
    picture: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    profileId: PropTypes.number,
    reviewContent: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    response: PropTypes.object,
    location: PropTypes.string, 
    isAdmin: PropTypes.bool,
    siteName: PropTypes.string
  };

  static defaultProps = {};

  render() {
    const { firstName, lastName, profileId, picture, location, isAdmin, siteName } = this.props;
    const { reviewContent, createdAt, response } = this.props;
    const { formatMessage } = this.props.intl;
    let date = moment(createdAt).format('MMMM YYYY');
    return (
        <div className={s.spaceTop3}>
            <Col md={2} sm={2} xs={12}>
            {
                !isAdmin && <div className={s.avatarWrapper}>
                        <Avatar
                            source={picture}
                            height={68}
                            width={68}
                            title={firstName}
                            className={s.profileAvatar}
                            withLink
                            linkClassName={s.profileAvatarLink}
                            profileId={profileId}
                        /> 
                    <div className={cx(s.textCenter, s.profileName)}>
                        <Link to={"/users/show/" + profileId}>{firstName} {lastName}</Link>
                    </div>
                    <span className={cx(s.showSm, s.textCenter)}>
                    <span className={cx(s.reviewMuted)}>
                        {date}
                    </span>
                    </span>
                </div>
            }
            {
                isAdmin && <div className={s.avatarWrapper}>
                    <Avatar
                        source={'../../../adminAvatar.png'}
                        height={68}
                        width={68}
                        title={formatMessage(messages.verifiedBy) + ' ' + siteName}
                        className={cx(s.profileAvatar, s.noBackground)}
                        staticImage
                    />
                    <div className={cx(s.textCenter, s.profileName)}>
                        {formatMessage(messages.verifiedBy) + ' ' + siteName}
                    </div>
                    <span className={cx(s.showSm, s.textCenter)}>
                        <span className={cx(s.reviewMuted)}>
                            {date}
                        </span>
                    </span>
                </div>
            }
            </Col>
            <Col md={10} sm={10} xs={12}>
            <div className={s.spaceTop2}>
                <div className={s.commentContainer}>
                <p>
                    {
                        reviewContent && (reviewContent.trim()).split("\n").map(function (content, index) {
                            return (
                                <span key={index}>
                                    {content}
                                    <br />
                                </span>
                            )
                        })
                    }
                </p>
                {
                    response && <ResponseItem 
                        data={response}
                    />  
                }  
                <div className={s.hideSm}>
                    <span className={cx(s.pullLeft, s.reviewMuted)}>
                        {
                            location && <span>From {location}.</span>
                        }
                        {' '}{date} .
                    </span>

                </div>   
                </div>
            </div>
            </Col>
            <Row className={cx(s.lineSeperation, s.space2)}>
            <Col lg={10} lgOffset={2} sm={10} smOffset={2} xs={12}>
                <hr className={s.horizontalLineThrough} />
            </Col>
            </Row>
        </div>
    );
  }
}

const mapState = state => ({
    siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ReviewItem)));