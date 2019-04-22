import {gql} from 'react-apollo';

import {
  UPDATE_RESERVATION_STATE_START,
  UPDATE_RESERVATION_STATE_SUCCESS,
  UPDATE_RESERVATION_STATE_ERROR
} from '../../constants';
import {sendEmail} from '../../core/email/sendEmail';

const getAllReservationQuery = gql `
  query getAllReservation ($userType: String){
    getAllReservation(userType: $userType){
      reservationData {
        id
        reservationState
      }
    }
  }
`;

export function updateReservation(reservationId, actionType, userType) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: UPDATE_RESERVATION_STATE_START,
    });

    try {

      let mutation = gql `
          mutation updateReservation(
            $reservationId: Int!, 
            $actionType: String!
          ){
              updateReservation(
                reservationId: $reservationId,
                actionType: $actionType
              ) {
                  status
              }
          }
      `;

      const {data} = await client.mutate({
        mutation,
        variables: {
          reservationId,
          actionType
        },
        refetchQueries: [
          {
            query: getAllReservationQuery,
            variables: {
              userType
            },
          }
        ]
      });

      if(data.updateReservation.status === '200'){
        let reservationQuery = gql `
          query getReservationData ($reservationId: Int!){
            getItinerary(reservationId: $reservationId){
              id
              confirmationCode
              checkIn
              listData {
                id
                title
                city
              }
              hostData {
                firstName
                userData {
                  email
                }
              }
              guestData {
                firstName
                userData {
                  email
                }
              }
              messageData {
                id
              }
              reservationState
            }
          }
        `;
        const reservation = await client.query({
          query: reservationQuery,
          variables: {
            reservationId,
          },
          fetchPolicy: 'network-only'
        });
        let content;

        if(reservation.data.getItinerary){
          let reservationState = reservation.data.getItinerary.reservationState;
          let confirmationCode = reservation.data.getItinerary.confirmationCode;
          let checkIn = reservation.data.getItinerary.checkIn;
          let hostName = reservation.data.getItinerary.hostData.firstName;
          let hostEmail = reservation.data.getItinerary.hostData.userData.email;
          let guestName = reservation.data.getItinerary.guestData.firstName;
          let guestEmail = reservation.data.getItinerary.guestData.userData.email;
          let listTitle = reservation.data.getItinerary.listData.title;
          let listCity = reservation.data.getItinerary.listData.city;
          let threadId = reservation.data.getItinerary.messageData.id;
          if(reservationState === 'approved') {
            content = {
              hostName,
              guestName,
              listTitle,
              listCity,
              threadId
            };
            await sendEmail(guestEmail, 'bookingConfirmedToGuest', content);
          }
          if(reservationState === 'declined') {
            content = {
              hostName,
              guestName,
              checkIn,
              confirmationCode
            };
            await sendEmail(guestEmail, 'bookingDeclinedToGuest', content);
          }

        }

        dispatch({
          type: UPDATE_RESERVATION_STATE_SUCCESS,
        }); 
      } 

    } catch (error) {
        dispatch({
          type: UPDATE_RESERVATION_STATE_ERROR,
          payload: {
            error
          }
        });
      return false;
    }

    return true;
  };
}