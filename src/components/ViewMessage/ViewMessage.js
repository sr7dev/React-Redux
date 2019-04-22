import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewMessage.css';
// Component
import UserDetail from './UserDetail';
import TripDetails from './TripDetails';
import ActionBlock from './ActionBlock';
import SendMessage from './SendMessage';
import ThreadItems from './ThreadItems';
import Loader from '../Loader';
// Graphql
import GetThreadQuery from './GetThreadQuery.graphql';
import GetMoreThreadItemsQuery from './GetMoreThreadItemsQuery.graphql';
// Locale
import messages from '../../locale/messages';
class ViewMessage extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.func,
    threadId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
    threadItemsData: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getThread: PropTypes.shape({
        guestProfile: PropTypes.shape({
          profileId: PropTypes.number.isRequired,
          picture: PropTypes.string,
          displayName: PropTypes.string.isRequired,
          firstyName: PropTypes.string.isRequired,
          location: PropTypes.string,
          reviewsCount: PropTypes.number,
          userVerification: PropTypes.object,
        }),
        guestUserData: PropTypes.shape({
          email: PropTypes.string.isRequired,
          userBanStatus: PropTypes.number,
        }),
        hostProfile: PropTypes.shape({
          profileId: PropTypes.number.isRequired,
          picture: PropTypes.string,
          displayName: PropTypes.string.isRequired,
          firstyName: PropTypes.string.isRequired,
          location: PropTypes.string,
          reviewsCount: PropTypes.number,
          userVerification: PropTypes.object,
        }),
        hostUserData: PropTypes.shape({
          email: PropTypes.string.isRequired,
          userBanStatus: PropTypes.number,
        }),
        threadItemForType: PropTypes.shape({
          reservationId: PropTypes.number,
          startDate: PropTypes.string.isRequired,
          endDate: PropTypes.string.isRequired,
          personCapacity: PropTypes.number.isRequired,
          createdAt: PropTypes.string.isRequired,
          cancelData: PropTypes.shape({
            guestServiceFee: PropTypes.number,
            hostServiceFee: PropTypes.number,
            refundToGuest: PropTypes.number,
            payoutToHost: PropTypes.number,
            total: PropTypes.number,
            currency: PropTypes.string,
          })
        }),
        listData: PropTypes.shape({
          title: PropTypes.string.isRequired,
          listingData: PropTypes.shape({
            basePrice: PropTypes.number.isRequired,
            cleaningPrice: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
          }),
        }),
      }),
    }),
  };
  static defaultProps = {
    threadId: null,
  };
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }
  loadMore() {
    const { threadItemsData: { loading, getThread: { threadItems }, fetchMore }, threadId } = this.props;
    fetchMore({
      query: GetMoreThreadItemsQuery,
      variables: {
        threadId,
        offset: threadItems.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }
        return {
          getThread: {
            ...previousResult.getThread,
            threadItems: [...previousResult.getThread.threadItems, ...fetchMoreResult.getAllThreadItems],
          },
        };
      },
    });
  }
  render() {
    const { threadItemsData: { loading, getThread }, userType, threadId, isAdminAuthenticated } = this.props;
    if (loading) {
      return <Loader type={'text'} />;
    }
    if (getThread && getThread.threadItemForType && getThread.hostProfile && getThread.guestProfile && getThread.listData) {
      let receiverName = getThread.guestProfile.firstName;
      let hostUserBanStatus = getThread.hostUserData.userBanStatus;
      let guestUserBanStatus = getThread.guestUserData.userBanStatus;
      let senderName = getThread.hostProfile.firstName;
      let receiverType = 'guest';
      let receiverEmail = getThread.guestUserData.email;
      if (userType === "guest") {
        receiverName = getThread.hostProfile.firstName;
        senderName = getThread.guestProfile.firstName;
        receiverType = 'host';
        receiverEmail = getThread.hostUserData.email;
      }
      const initialValues = {
        threadId,
        threadType: userType,
        type: 'message',
        receiverName,
        senderName,
        receiverType,
        receiverEmail
      };
      
      return (
        <Grid>
          <Row>
            <Col md={7} mdPush={5} className={s.space4}>
              {
                !isAdminAuthenticated && !guestUserBanStatus && !hostUserBanStatus && <ActionBlock
                  threadType={userType}
                  actionType={getThread.threadItemForType.type}
                  threadId={threadId}
                  listId={getThread.listId}
                  reservationId={getThread.threadItemForType.reservationId}
                  startDate={getThread.threadItemForType.startDate}
                  endDate={getThread.threadItemForType.endDate}
                  personCapacity={getThread.threadItemForType.personCapacity}
                  createdAt={getThread.threadItemForType.createdAt}
                  hostDisplayName={getThread.hostProfile.displayName}
                  guestDisplayName={getThread.guestProfile.displayName}
                  guestEmail={getThread.guestUserData.email}
                  title={getThread.listData.title}
                />
              }
              {
                !isAdminAuthenticated && <SendMessage
                  initialValues={initialValues}
                  threadId={threadId}
                  profileId={userType === 'host' ? getThread.hostProfile.profileId : getThread.guestProfile.profileId}
                  picture={userType === 'host' ? getThread.hostProfile.picture : getThread.guestProfile.picture}
                  displayName={userType === 'host' ? getThread.hostProfile.displayName : getThread.guestProfile.displayName}
                />
              }
              <ThreadItems
                userType={userType}
                threadId={threadId}
                data={getThread}
                loadMore={this.loadMore}
              />
            </Col>
            <Col md={4} mdPull={7} className={cx(s.sidebarDesign, s.space4)}>
              <UserDetail
                profileId={userType === 'host' ? getThread.guestProfile.profileId : getThread.hostProfile.profileId}
                picture={userType === 'host' ? getThread.guestProfile.picture : getThread.hostProfile.picture}
                displayName={userType === 'host' ? getThread.guestProfile.displayName : getThread.hostProfile.displayName}
                location={userType === 'host' ? getThread.guestProfile.location : getThread.hostProfile.location}
                reviewsCount={userType === 'host' ? getThread.guestProfile.reviewsCount : getThread.hostProfile.reviewsCount}
                verifications={userType === 'host' ? getThread.guestProfile.userVerification : getThread.hostProfile.userVerification}
              />
              <TripDetails
                listId={getThread.listId}
                userType={userType}
                title={getThread.listData.title}
                basePrice={getThread.listData.listingData.basePrice}
                cleaningPrice={getThread.listData.listingData.cleaningPrice}
                monthlyDiscount={getThread.listData.listingData.monthlyDiscount}
                weeklyDiscount={getThread.listData.listingData.weeklyDiscount}
                currency={getThread.listData.listingData.currency}
                startDate={getThread.threadItemForType.startDate}
                endDate={getThread.threadItemForType.endDate}
                personCapacity={getThread.threadItemForType.personCapacity}
                cancelData={getThread.threadItemForType.cancelData}
              />
            </Col>
          </Row>
        </Grid>
      );
    }
    return (
      <Grid>
        <Row>
          <Col md={7} mdPush={5} className={s.space4}>
            <FormattedMessage {...messages.noThreadFound} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
const mapState = (state) => ({
  isAdminAuthenticated: state.runtime.isAdminAuthenticated
});
const mapDispatch = {};
export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(GetThreadQuery, {
    name: 'threadItemsData',
    options: props => ({
      variables: {
        threadId: props.threadId,
        threadType: props.userType,
      },
      fetchPolicy: 'network-only',
    }),
  }),
)(ViewMessage);
