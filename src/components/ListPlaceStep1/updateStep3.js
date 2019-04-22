// Redux Form
import { SubmissionError } from 'redux-form';

import { FormattedMessage, injectIntl } from 'react-intl';

// Fetch request
import fetch from '../../core/fetch';

// Locale
import messages from '../../locale/messages';

// Redux Action
import { getListingData } from '../../actions/getListing';
import { getListingDataStep3 } from '../../actions/getListingDataStep3';
import { manageListingSteps } from '../../actions/manageListingSteps';
import {setLoaderStart, setLoaderComplete} from '../../actions/loader/loader';

// For Redirect
import history from '../../core/history';

async function updateStep3(values, dispatch) {

  let weeklyDiscount = values.weeklyDiscount != '' ? values.weeklyDiscount : 0;
  let monthlyDiscount = values.monthlyDiscount != '' ? values.monthlyDiscount : 0;
  let cleaningPrice = values.cleaningPrice != '' ? values.cleaningPrice : 0;
  let variables = Object.assign({}, values,{ weeklyDiscount, monthlyDiscount, cleaningPrice} );

  dispatch(setLoaderStart('updateListing'));
  const query = `query (
  	$id: Int,
    $houseRules: [Int],
    $bookingNoticeTime:String,
    $checkInStart:String,
    $checkInEnd:String,
    $maxDaysNotice:String,
    $minNight:Int,
    $maxNight:Int,
    $basePrice:Float,
    $cleaningPrice:Float,
    $currency:String,
    $weeklyDiscount:Int,
    $monthlyDiscount:Int,
    $blockedDates: [String],
    $bookingType: String!,
    $cancellationPolicy: Int,
  ) {
      updateListingStep3 (
        id: $id,
        houseRules: $houseRules,
        bookingNoticeTime:$bookingNoticeTime,
        checkInStart:$checkInStart,
        checkInEnd:$checkInEnd,
        maxDaysNotice:$maxDaysNotice,
        minNight:$minNight,
        maxNight:$maxNight,
        basePrice:$basePrice,
        cleaningPrice:$cleaningPrice,
        currency:$currency,
        weeklyDiscount:$weeklyDiscount,
        monthlyDiscount:$monthlyDiscount,
        blockedDates: $blockedDates,
        bookingType: $bookingType,
        cancellationPolicy: $cancellationPolicy
      ) {
        status
      }
    }`;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables
    }),
    credentials: 'include'
  });

  const { data } = await resp.json();

  if(data && data.updateListingStep3 != undefined) {
     if(data.updateListingStep3.status == "success") {
      history.push('/become-a-host/' + values.id + '/home');
      dispatch(getListingDataStep3(values.id));
      dispatch(manageListingSteps(values.id, 3));
      dispatch(setLoaderComplete('updateListing'));
    } else if (data.updateListingStep3.status == "notLoggedIn") {
        dispatch(setLoaderComplete('updateListing'));
        throw new SubmissionError({ _error: messages.notLoggedIn });
    } else {
        dispatch(setLoaderComplete('updateListing'));
        throw new SubmissionError({ _error: messages.somethingWentWrong });
    }
  } else {
    dispatch(setLoaderComplete('updateListing'));
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }
  
}

export default updateStep3;
