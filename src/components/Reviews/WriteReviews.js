import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';

// Components
import Link from '../Link';
import Loader from '../Loader';
import Avatar from '../Avatar';

// Locale
import messages from '../../locale/messages';

class WriteReviews extends React.Component {

	static propTypes = {
		pendingData: PropTypes.shape({
			loading: PropTypes.bool,
			pendingReviews: PropTypes.arrayOf(PropTypes.shape({
				id: PropTypes.number.isRequired,
				listId: PropTypes.number.isRequired,
				hostId: PropTypes.string.isRequired,
				guestId: PropTypes.string.isRequired,
				hostData: PropTypes.shape({
					firstName: PropTypes.string.isRequired,
					lastName: PropTypes.string.isRequired,
					picture: PropTypes.string,
					profileId: PropTypes.number.isRequired,
				}),
				guestData: PropTypes.shape({
					firstName: PropTypes.string.isRequired,
					lastName: PropTypes.string.isRequired,
					picture: PropTypes.string,
					profileId: PropTypes.number.isRequired,
				}),
			}))
		}),
		userId: PropTypes.string.isRequired,
		formatMessage: PropTypes.func,
	};

	render() {
		const { data: { loading, pendingReviews }, userId } = this.props;
		const { formatMessage } = this.props.intl;
		return (
			<Panel header={formatMessage(messages.reviewToWrite)} className={s.panelNolist}>
				{
					loading && <Loader type={"text"} />
				}
				{
					!loading && (!pendingReviews || (pendingReviews && 
					pendingReviews.length === 0)) && <p>
						<FormattedMessage {...messages.reviewContent} />
					</p>
				}
				{
					!loading && pendingReviews && <div>
						{
							pendingReviews.map((item, index) => {
								let isHost = false;
								if (userId === item.hostId) {
									isHost = true;
								}
								if(item.guestData && item.hostData) {
									return (
										<ul className={cx(s.listStyle, s.spaceTop4, s.mediaDisplay)}>
											<li>
												<div className={cx(s.pullLeft, s.mediaContainer, s.textCenter)} >
													<Avatar
														source={isHost ? item.guestData.picture : item.hostData.picture}
														height={68}
														width={68}
														title={isHost ? item.guestData.firstName : item.hostData.firstName}
														className={s.profileAvatar}
														withLink
														linkClassName={s.profileAvatarLink}
														profileId={isHost ? item.guestData.profileId : item.hostData.profileId}
													/>
													<div className={s.name}>
														<Link to={"/users/show/" + isHost ? item.guestData.profileId : item.hostData.profileId}>
															{isHost ? item.guestData.firstName : item.hostData.firstName}
															{' '}{isHost ? item.guestData.lastName : item.hostData.lastName}
														</Link>
													</div>
												</div>
												<div className={cx(s.mediaDisplayCell, s.textAlignCenter)}>
													<p><FormattedMessage {...messages.submitReviewFor} /> {isHost ? item.guestData.firstName : item.hostData.firstName} </p>
													<Link to={"/review/write/" + item.id}><FormattedMessage {...messages.writeReview} /></Link><br />
													<Link to={"/users/trips/itinerary/" + item.id}>
														<FormattedMessage {...messages.viewLitneray} />
													</Link>
												</div>

											</li>
										</ul>
									);
								}
								
							})
						}
					</div>
				}
			</Panel>
		);
	}
}

const mapState = (state) => ({
	userId: state.account.data.userId,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(WriteReviews)));
