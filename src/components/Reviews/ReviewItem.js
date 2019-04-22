import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import { Panel, Row, Col } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';

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
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    profileId: PropTypes.number.isRequired,
    reviewContent: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    response: PropTypes.object,
    otherUserResponse: PropTypes.bool,
    showUserName: PropTypes.bool,
    otherUserName: PropTypes.string,
    otherUserProfileId: PropTypes.number,
    isAdmin: PropTypes.bool,
    siteName: PropTypes.string
  };

  static defaultProps = {
      response: null,
      showUserName: false
  };

  render() {
    const { firstName, lastName, profileId, picture, otherUserName, otherUserProfileId, isAdmin } = this.props;
    const { reviewContent, createdAt, response, otherUserResponse, showUserName, siteName } = this.props;
    let date = moment(createdAt).format('MMMM YYYY');
    const { formatMessage } = this.props.intl;

    return (
            <li>
                {
                    !isAdmin && <div className={cx(s.pullLeft, s.mediaContainer,s.textCenter)} >
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
                        <div className={s.name}>
                        <Link to={"/users/show/" + profileId}>{firstName} {lastName}</Link>
                        </div>
                    </div>
                }
                {
                    isAdmin && <div className={cx(s.pullLeft, s.mediaContainer, s.textCenter)} >
                        <Avatar
                            source={'../../../adminAvatar.png'}
                            height={68}
                            width={68}
                            title={formatMessage(messages.verifiedBy) + ' ' + siteName}
                            className={cx(s.profileAvatar, s.noBackground)}
                            staticImage
                        />
                        <div className={s.name}>
                            {formatMessage(messages.verifiedBy) + ' ' + siteName}
                        </div>
                    </div>
                }
                <div className={s.reviewBody}>
                    {
                        showUserName && <span className={s.textBold}>
                            <FormattedMessage {...messages.reviewFor} />{' '}
                            <Link to={"/users/show/" + otherUserProfileId}>{otherUserName}</Link>:
                        </span>
                    }
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
                            otherUserResponse={otherUserResponse}
                        />  
                    }           
                    <p className={s.reviewMuted}>{date}</p>
                </div>

                <Row className={s.lineSeperation}>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <hr className={s.horizontalLineThrough} />
                    </Col>
                </Row>
            </li>
    );
  }
}

const mapState = state => ({
    siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ReviewItem)));