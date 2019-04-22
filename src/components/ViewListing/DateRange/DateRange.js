import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

import { DateRangePicker, isInclusivelyBeforeDay, isInclusivelyAfterDay } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';

// Redux
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';


// Redux Action
import { change } from 'redux-form';
import { checkAvailability } from '../../../actions/checkAvailability';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';


class DateRange extends React.Component {
  static propTypes = {
    minimumNights: PropTypes.number.isRequired,
    maximumNights: PropTypes.number.isRequired,
    checkAvailability: PropTypes.func.isRequired,
    blockedDates: PropTypes.array.isRequired,
    listId: PropTypes.number.isRequired,
    formName: PropTypes.string.isRequired,
    maxDaysNotice: PropTypes.string.isRequired,
    formatMessage: PropTypes.func,
  };

  static defaultProps = {
    blockedDates: [],
    maxDaysNotice: 'unavailable'
  }

  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
      blockedDates: [],
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.isDayBlocked = this.isDayBlocked.bind(this);
  }
  componentDidMount() {
    const { bookingStartDate, bookingEndDate, blockedDates } = this.props;
    const { formName } = this.props;
    const blockedDatesSet = new Set();

    if (formName == 'BookingForm') {
      if (bookingStartDate && bookingEndDate) {
        this.setState({ 
          startDate: moment(bookingStartDate), 
          endDate: moment(bookingEndDate) 
        });
      }
    }

    blockedDates.forEach(day => {
      blockedDatesSet.add(moment(day.blockedDates).format('YYYY-MM-DD'));
    });

    this.setState({ blockedDatesSet });
  }

  componentWillReceiveProps(nextProps) {
    const { bookingStartDate, bookingEndDate, blockedDates } = nextProps;
    const { formName } = nextProps;
    const { blockedDatesSet } = this.state;

    if (formName == 'BookingForm') {
      if (bookingStartDate && bookingEndDate) {
        this.setState({ 
          startDate: moment(bookingStartDate), 
          endDate: moment(bookingEndDate) 
        });
      }
    }

    blockedDates.forEach(day => {
      blockedDatesSet.add(moment(day.blockedDates).format('YYYY-MM-DD'));
    });

    this.setState({ blockedDatesSet });
  }

  async onDatesChange({ startDate, endDate }) {
    const { focusedInput } = this.state;
    const { listId, formName, checkAvailability, change, maximumNights } = this.props;

    this.setState({ startDate, endDate });
    await change(formName, 'startDate', startDate);
    await change(formName, 'endDate', endDate);
    if (focusedInput === END_DATE && endDate) {
      checkAvailability(listId, startDate, endDate, maximumNights);
    }
  }

  onFocusChange(focusedInput) {
    const { startDate } = this.state;
    this.setState({ focusedInput });
    if (focusedInput === START_DATE) {
          // this.setState({ endDate: null });
    }
  }
    /** Blocked Dates **/
    /* isDayBlocked(day){
      const { blockedDates } = this.props;
      let days = [];

      if(blockedDates.length > 0){
        blockedDates.map((item, key) => {
          days.push(moment(item.blockedDates));
        });
      }

      return days.filter(d => d.isSame(day, 'day')).length > 0;
    }*/
  isDayBlocked(day) {
    const { blockedDatesSet } = this.state;
    if (blockedDatesSet) {
      return blockedDatesSet.has(moment(day).format('YYYY-MM-DD'));
    } else {
      return null;
    }
  }


  render() {
    const { focusedInput, startDate, endDate } = this.state;
    const { minimumNights, maximumNights, blockedDates, maxDaysNotice } = this.props;
    const { formatMessage } = this.props.intl;
    let condition,maximumEndDate;
    const today = moment();
    let breakPoint;
    if(maxDaysNotice === 'unavailable') {
      condition = day =>
        !isInclusivelyAfterDay(day, today) ||
        isInclusivelyAfterDay(day, today)
    } else {
      if (maxDaysNotice === '3months') {
        breakPoint = moment().add(3, 'months');
      } else if (maxDaysNotice === '6months') {
        breakPoint = moment().add(6, 'months');
      } else if (maxDaysNotice === '9months') {
        breakPoint = moment().add(9, 'months');
      } else if (maxDaysNotice === '12months') {
        breakPoint = moment().add(12, 'months');
      } 
      if (maxDaysNotice !== 'available') {
        condition = day =>
          !isInclusivelyAfterDay(day, today) ||
          isInclusivelyAfterDay(day, breakPoint)
      }
      
    }
    /*if (maximumNights > 0) {
      maximumEndDate = moment().add(maximumNights + 1, 'days');
    }

    if (startDate && maximumNights > 0) {
      maximumEndDate = startDate.clone().add(maximumNights + 1, 'days');
    }

    if (focusedInput === END_DATE) {
      condition = day => !isInclusivelyAfterDay(day, moment()) || isInclusivelyAfterDay(day, maximumEndDate);
    }

    if (focusedInput === START_DATE) {
      condition = day => !isInclusivelyAfterDay(day, moment());
    }*/
    
    
    

    // Disable all by default
    /*condition = day =>
        !isInclusivelyAfterDay(day, today) ||
        isInclusivelyAfterDay(day, today)*/

    // 3 months into the future
    /*condition = day =>
      !isInclusivelyAfterDay(day, today) ||
      isInclusivelyAfterDay(day, breakPoint)*/
    // 3 months into the future
   


    return (
      <div>
        <DateRangePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          numberOfMonths={1}
          startDatePlaceholderText={formatMessage(messages.checkIn)}
          endDatePlaceholderText={formatMessage(messages.checkOut)}
          startDateId={'It is Start date id'}
          endDateId={'It is Start date id'}
          minimumNights={minimumNights > 0 ? minimumNights : 1}
          isDayBlocked={day => this.isDayBlocked(day)}
          isOutsideRange={condition}
          hideKeyboardShortcutsPanel
        />
      </div>
    );
  }
}

const bookingFormSelector = formValueSelector('BookingForm');

const mapState = state => ({
  isLoading: state.viewListing.isLoading,
  availability: state.viewListing.availability,
  bookingStartDate: bookingFormSelector(state, 'startDate'),
  bookingEndDate: bookingFormSelector(state, 'endDate'),


});

const mapDispatch = {
  checkAvailability,
  change,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(DateRange)));
