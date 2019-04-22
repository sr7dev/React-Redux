// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLFloat as FloatType,
} from 'graphql';

import ReservationType from '../../types/ReservationType';

// Sequelize models
import { Reservation } from '../../models';

const createReservation = {

  type: ReservationType,

  args: {
    listId: {type: new NonNull(IntType) },
    hostId: {type: new NonNull(StringType)},
    guestId: {type: new NonNull(StringType)},
    checkIn: {type: new NonNull(StringType)},
    checkOut: {type: new NonNull(StringType)},
    guests: {type: new NonNull(IntType)},
    message: {type: new NonNull(StringType)},
    basePrice: {type: new NonNull(FloatType)},
    cleaningPrice: {type: FloatType},
    currency: {type: new NonNull(StringType)},
    discount: {type: FloatType},
    discountType: {type: StringType},
    guestServiceFee: {type: FloatType},
    hostServiceFee: {type: FloatType},
    total: {type: new NonNull(FloatType)},
    bookingType: {type: StringType},
    paymentType: {type: IntType}
  },

  async resolve({ request, response }, {
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
    bookingType,
    paymentType
  }) {

    // Check if user already logged in
    if(request.user && !request.user.admin) {

        const userId = request.user.id;
        let confirmationCode = Math.floor(100000 + Math.random() * 900000);
        let reservationState;
        if(bookingType === 'instant'){
          reservationState = 'approved';
        }
        const reservation = await Reservation.create({
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
          reservationState,
          paymentMethodId: paymentType
        });

        if(reservation) {
          return reservation;
        } else {
          return {
            status: 'failed to create a reservation'
          }
        }
    } else {
        return {
          status: "notLoggedIn",
        };
    }
  },
};

export default createReservation;

/**
mutation createReservation(
  $listId: Int!, 
  $hostId: String!,
  $guestId: String!,
  $checkIn: String!,
  $checkOut: String!,
  $guests: Int!,
  $message: String!,
  $basePrice: Float!,
  $cleaningPrice: Float!,
  $currency: String!,
  $discount: Float,
  $discountType: String,
  $guestServiceFee: Float,
  $hostServiceFee: Float,
  $total: Float!,
  $bookingType: String
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
      bookingType: $bookingType
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
    }
}
**/ 
