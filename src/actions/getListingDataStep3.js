import { gql } from 'react-apollo';

import {
  GET_LISTING_DATA_STEP3_START,
  GET_LISTING_DATA_STEP3_SUCCESS,
  GET_LISTING_DATA_STEP3_ERROR } from '../constants';

import { initialize } from 'redux-form';

const query = gql`
  query ($listId:String!, $preview: Boolean) {
    UserListing (listId:$listId, preview: $preview) {
      id
      userId
      bookingType
      isPublished
      houseRules {
        houseRulesId
      }
      listingData {
        bookingNoticeTime,
        checkInStart,
        checkInEnd,
        maxDaysNotice,
        minNight,
        maxNight,
        basePrice,
        cleaningPrice,
        currency,
        weeklyDiscount,
        monthlyDiscount,
        cancellationPolicy
      }
      blockedDates {
        blockedDates
        reservationId
      }
      calendars {
        id
        name
        url
        listId
        status
      }
    }
  }
`;

export function getListingDataStep3(listId) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: GET_LISTING_DATA_STEP3_START,
    });

    try {
      let formValues = null;
      let settingFieldsData = {};
      const houseRules = [];
      const updatedBlockedDates = [];
      const updatedDisabledDates = [];
      let listData = {};

      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { listId, preview: true },
        fetchPolicy: 'network-only',
      });


      if (data && data.UserListing) {
        // Preparing List data
        listData = data.UserListing.listingData;

        // Preparing for house rules
        if (data.UserListing.houseRules.length > 0) {
          data.UserListing.houseRules.map((item, value) => {
            houseRules.push(parseInt(item.houseRulesId));
          });
          settingFieldsData = Object.assign({}, listData, { houseRules });
        }

        // Preparing for blocked dates
        if (data.UserListing.blockedDates.length > 0) {
          data.UserListing.blockedDates.map((item, value) => {
            if(item.reservationId != null) {
              updatedDisabledDates.push(new Date(item.blockedDates));
            } else {
              updatedBlockedDates.push(new Date(item.blockedDates));
            }
            
          });
          settingFieldsData = Object.assign({}, listData, settingFieldsData, 
          { 
            disabledDates: updatedDisabledDates,  
            blockedDates: updatedBlockedDates
          });
        }

        formValues = Object.assign({}, data.UserListing, settingFieldsData, listData);

        // Reinitialize the form values
        dispatch(initialize('ListPlaceStep3', formValues, true));

        // Dispatch a success action
        dispatch({
          type: GET_LISTING_DATA_STEP3_SUCCESS,
          step3DataIsLoaded: true,
          isExistingList: true,
          calendars: data.UserListing.calendars
        });
      } else {
        dispatch({
          type: GET_LISTING_DATA_STEP3_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_LISTING_DATA_STEP3_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
