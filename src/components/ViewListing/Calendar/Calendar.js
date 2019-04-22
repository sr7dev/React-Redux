import React from 'react';
import PropTypes from 'prop-types';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calendar.css';
import {
    Button,
    Col,
    FormGroup
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Locale
import messages from '../../../locale/messages';
// Redux
import { connect } from 'react-redux';
// External Component
//import Loader from 'react-loader-advanced';
import Loader from '../../Loader';
import SocialShare from '../SocialShare';
// Component
import CurrencyConverter from '../../CurrencyConverter';
import ViewCount from '../ViewCount';
import BookingForm from './BookingForm';
class Calendar extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        personCapacity: PropTypes.number.isRequired,
        listingData: PropTypes.shape({
            basePrice: PropTypes.number.isRequired,
            cleaningPrice: PropTypes.number,
            currency: PropTypes.string,
            monthlyDiscount: PropTypes.number,
            weeklyDiscount: PropTypes.number,
            minNight: PropTypes.number,
            maxNight: PropTypes.number,
            maxDaysNotice: PropTypes.string,
        }),
        isLoading: PropTypes.bool,
        loading: PropTypes.bool,
        blockedDates: PropTypes.array,
        isHost: PropTypes.bool.isRequired,
        bookingType: PropTypes.string.isRequired,
        formatMessage: PropTypes.func,
        userBanStatus: PropTypes.number,
    };
    static defaultProps = {
        isLoading: false,
        loading: false,
        blockedDates: [],
        isHost: false,
        listingData: {
            basePrice: 0,
            cleaningPrice: 0,
            monthlyDiscount: 0,
            weeklyDiscount: 0,
            minNight: 0,
            maxNight: 0
        }
    };
    constructor(props) {
        super(props);
    }
    render() {
        const { id, personCapacity, isLoading, isHost, userBanStatus, bookingType } = this.props;
        const { listingData: { basePrice, cleaningPrice, currency, monthlyDiscount, weeklyDiscount, minNight, maxNight, maxDaysNotice } } = this.props;
        const { loading, blockedDates, startDate, endDate } = this.props;
        let loadingStatus = loading || isLoading || false;
        let initialValues = {
            startDate,
            endDate
        }
        
        return (
            <div className={cx(s.bookItContainer, 'bookItContentCommon')}>
                <div className={cx(s.bookItContentBox)} data-sticky-section>
                    <div className={cx(s.bootItPriceSection)}>
                        <Col xs={8} sm={8} md={8} className={cx(s.noPadding)}>
                            <div className={s.bookItPriceAmount}>
                                {
                                    bookingType === "instant" && <span>
                                        <FontAwesome.FaBolt className={s.instantIcon} />
                                    </span>
                                }
                                <CurrencyConverter
                                    amount={basePrice}
                                    className={s.bookItPrice}
                                    from={currency}
                                />
                            </div>
                        </Col>
                        <Col xs={4} sm={4} md={4} className={cx(s.noPadding, 'text-right')}>
                            <span><FormattedMessage {...messages.perNight} /></span>
                        </Col>
                    </div>
                    <div className={cx('bookItFormSection')}>
                        <Loader
                            show={loadingStatus}
                            type={"page"}
                        >
                            <div className={s.bookItPanel}>
                                <BookingForm
                                    initialValues={initialValues}
                                    id={id}
                                    personCapacity={personCapacity}
                                    basePrice={basePrice}
                                    cleaningPrice={cleaningPrice}
                                    currency={currency}
                                    monthlyDiscount={monthlyDiscount}
                                    weeklyDiscount={weeklyDiscount}
                                    minNight={minNight}
                                    maxNight={maxNight}
                                    blockedDates={blockedDates}
                                    isHost={isHost}
                                    userBanStatus={userBanStatus}
                                    bookingType={bookingType}
                                    maxDaysNotice={maxDaysNotice}
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                                <div>
                                    <FormGroup className={cx(s.formGroup, s.textMuted, 'text-center')}>
                                        <small><FormattedMessage {...messages.bookingInfo} /></small>
                                    </FormGroup>
                                </div>
                                <ViewCount
                                    listId={id}
                                    isHost={isHost}
                                />
                            </div>
                        </Loader>
                        <div className={cx(s.spaceTop4, s.bookItPanel)}>
                            <SocialShare listId={id} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 
const mapState = (state) => ({
    isLoading: state.viewListing.isLoading,
});
const mapDispatch = {
   
};
export default withStyles(s)(connect(mapState, mapDispatch)(Calendar))