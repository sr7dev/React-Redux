import {gql} from 'react-apollo';
import {
  BOOKING_PAYMENT_START,
  BOOKING_PAYMENT_SUCCESS,
  BOOKING_PAYMENT_ERROR, 
} from '../../constants';

import {sendPayment} from '../../core/payment/sendPayment';
// Helper
import { convert } from '../../helpers/currencyConvertion';

// Stripe
import { processStripePayment } from '../../core/payment/stripe/processStripePayment';

import { toastr } from 'react-redux-toastr';

export function makePayment(
    listId, 
    title,
    hostId, 
    guestId, 
    checkIn, 
    checkOut, 
    guests, 
    message,
    basePrice, 
    cleaningPrice,
    currency,
    discount,
    discountType,
    guestServiceFee,
    hostServiceFee,
    total,
    bookingType,
    paymentCurrency,
    paymentType,
    name,
    cardNumber,
    cvv,
    expiryDate,
    expiryYear,
    guestEmail
  ) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: BOOKING_PAYMENT_START,
      payload: {
        paymentLoading: true
      }
    });

    try {

      const mutation = gql `
        mutation createReservation(
          $listId: Int!, 
          $hostId: String!,
          $guestId: String!,
          $checkIn: String!,
          $checkOut: String!,
          $guests: Int!,
          $message: String!,
          $basePrice: Float!,
          $cleaningPrice: Float,
          $currency: String!,
          $discount: Float,
          $discountType: String,
          $guestServiceFee: Float,
          $hostServiceFee: Float,
          $total: Float!,
          $bookingType: String,
          $paymentType: Int!
        ){
            createReservation(
              listId: $listId,
              hostId: $hostId,
              guestId: $guestId,
              checkIn: $checkIn,
              checkOut: $checkOut,
              guests: $guests,
              message: $message,
              basePrice: $basePrice,
              cleaningPrice: $cleaningPrice,
              currency: $currency,
              discount: $discount,
              discountType: $discountType,
              guestServiceFee: $guestServiceFee,
              hostServiceFee: $hostServiceFee,
              total: $total,
              bookingType: $bookingType,
              paymentType: $paymentType
            ) {
                id
                listId,
                hostId,
                guestId,
                checkIn,
                checkOut,
                guests,
                message,
                basePrice,
                cleaningPrice,
                currency,
                discount,
                discountType,
                guestServiceFee,
                hostServiceFee,
                total,
                confirmationCode,
                createdAt
                status
                paymentMethodId
            }
        }
      `;

      let preApprove = getState().book.bookDetails.preApprove;
      let bookingTypeData;
      if(preApprove === true){
        bookingTypeData = 'instant';
      } else {
        bookingTypeData = bookingType;
      }


      const { data } = await client.mutate({
        mutation,
        variables: {
          listId, 
          hostId, 
          guestId, 
          checkIn, 
          checkOut, 
          guests, 
          message,
          basePrice, 
          cleaningPrice,
          currency,
          discount,
          discountType,
          guestServiceFee,
          hostServiceFee,
          total,
          bookingType: bookingTypeData,
          paymentType
        }
      })
      
      if(data && data.createReservation){
        let reservationId = data.createReservation.id;
        let amount = total + guestServiceFee;
        let rates = getState().currency.rates;
        let currentCurrency = (getState().currency.to) ? getState().currency.to : getState().currency.base;
        let baseCurrency = getState().currency.base;
        let convertedAmount = 0;
        if (paymentType == 1) {
          convertedAmount = convert(baseCurrency, rates, amount, currency, paymentCurrency);
          sendPayment(reservationId, convertedAmount.toFixed(2), paymentCurrency, title);
          dispatch({
            type: BOOKING_PAYMENT_SUCCESS,
            payload: { paymentLoading: false }
          });
        } else {
          convertedAmount = convert(baseCurrency, rates, amount, currency, currentCurrency);
          let cardDetails = {
            name,
            number: cardNumber,
            exp_month: expiryDate,
            exp_year: expiryYear,
            cvc: cvv
          };
          let reservationDetails = {
            reservationId,
            listId,
            hostId,
            guestId,
            guestEmail,
            title,
            amount: convertedAmount.toFixed(2),
            currency: currentCurrency
          };
          const { status, errorMessage } = await processStripePayment(
            'reservation',
            cardDetails,
            reservationDetails
          );

          if (status === 200) {
            dispatch({
              type: BOOKING_PAYMENT_SUCCESS,
              payload: { paymentLoading: true }
            });

          } else {
            errorMessage ? toastr.error('Failed!', errorMessage) : '';
            dispatch({
              type: BOOKING_PAYMENT_SUCCESS,
              payload: { paymentLoading: false }
            });
          }
        }
      }
    } catch (error) {
        dispatch({
          type: BOOKING_PAYMENT_ERROR,
          payload: {
            error,
            paymentLoading: false
          }
        });
      return false;
    }

    return true;
  };
}

