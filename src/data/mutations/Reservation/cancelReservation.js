// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ReservationType from '../../types/ReservationType';

// Sequelize models
import { Reservation, ListBlockedDates, CancellationDetails, ThreadItems } from '../../models';

const cancelReservation = {

  type: ReservationType,

  args: {
    reservationId: { type: new NonNull(IntType)},
    cancellationPolicy: { type: new NonNull(StringType)},
    refundToGuest: { type: new NonNull(FloatType)},
    payoutToHost: { type: new NonNull(FloatType)},
    guestServiceFee: { type: new NonNull(FloatType)},
    hostServiceFee: { type: new NonNull(FloatType)},
    total: { type: new NonNull(FloatType)},
    currency: { type: new NonNull(StringType)},
    threadId: { type: new NonNull(IntType)},
    cancelledBy: { type: new NonNull(StringType)},
    message: { type: new NonNull(StringType)},
    checkIn: { type: new NonNull(StringType)},
    checkOut: { type: new NonNull(StringType)},
    guests: { type: new NonNull(IntType)},
  },

  async resolve({ request, response }, { 
    reservationId, 
    cancellationPolicy, 
    refundToGuest,
    payoutToHost, 
    guestServiceFee, 
    hostServiceFee, 
    total, 
    currency,
    threadId, 
    userId,
    cancelledBy,
    message,
    checkIn,
    checkOut,
    guests
   }) {
    let isReservationUpdated = false;
    // Check if user already logged in
    if(request.user && !request.user.admin) {

        const userId = request.user.id;

        const count = await Reservation.count({
          where: {
            id: reservationId,
            reservationState: 'cancelled'
          }
        });

        if(count > 0){
          return {
            status: '400'
          };
        }

        // Update Reservation table
        const updateReservation = await Reservation.update({
          reservationState: 'cancelled'
        },{
          where: {
            id: reservationId
          }
        }).then(function(instance){
          // Check if any rows are affected
          if(instance > 0) {
            isReservationUpdated = true;
          }
        });

        // Unblock the blocked dates only if guest cancels the reservation
        if(cancelledBy === 'guest'){
          const unlockBlockedDates = await ListBlockedDates.destroy({
            where: {
              reservationId
            }
          });
        }

        // Create record for cancellation details
        const cancellation = CancellationDetails.create({
          reservationId,
          cancellationPolicy,
          refundToGuest,
          payoutToHost, 
          guestServiceFee, 
          hostServiceFee, 
          total, 
          currency,
          cancelledBy
        });

        // Create thread items
        const thread = ThreadItems.create({
          threadId,
          reservationId,
          sentBy: userId,
          content: message,
          type: cancelledBy === 'host' ? 'cancelledByHost' : 'cancelledByGuest',
          startDate: checkIn,
          endDate: checkOut,
          personCapacity: guests
        });

        if(isReservationUpdated){
          return {
            status: '200'
          }
        } else {
          return {
            status: '400'
          }
        }

    } else {
        return {
          status: "notLoggedIn",
        };
    }
  },
};

export default cancelReservation;

/**
mutation cancelReservation(
  $reservationId: Int!,
  $cancellationPolicy: String!,
  $refundToGuest: Float!,
  $payoutToHost: Float!,
  $guestServiceFee: Float!,
  $hostServiceFee: Float!,
  $total: FloatType!,
  $currency: String!,
  $threadId: Int!,
  $cancelledBy: String!,
  $message: String!
){
    cancelReservation(
      reservationId: $reservationId,
      cancellationPolicy: $cancellationPolicy,
      refundToGuest: $refundToGuest,
      payoutToHost: $payoutToHost,
      guestServiceFee: $guestServiceFee,
      hostServiceFee: $hostServiceFee,
      total: $total,
      currency: $currency,
      threadId: $threadId,
      cancelledBy: $cancelledBy,
      message: $message
    ) {
        status
    }
}
**/ 
