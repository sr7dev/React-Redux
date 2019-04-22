import ReservationType from '../../types/ReservationType';
import {Reservation} from '../../models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType
} from 'graphql';

const getAllReservationAdmin = {

    type:  new List(ReservationType),

    async resolve({request}) {
        if(request.user.admin) {
            let paymentState = 'completed';

            return await Reservation.findAll({
                where: { 
                  paymentState
                },
                order: [['createdAt', 'DESC']] 
            });
        } else {
            return {
              status: "notLoggedIn",
            };
        }
    }
};

export default getAllReservationAdmin;

/**

query getAllReservationAdmin{
  getAllReservationAdmin{
    id
    listId
    checkIn
    checkOut
    guestServiceFee
    hostServiceFee
    reservationState
        total
    messageData {
      id
    }
    listData {
      id
      title
      street
      city
      state
      country
    }
    hostData {
      profileId
      displayName
      picture
    }
    guestData {
      profileId
      displayName
      picture
    }
    status
  }
}

**/