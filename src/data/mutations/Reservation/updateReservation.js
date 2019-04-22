// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ReservationType from '../../types/ReservationType';

// Sequelize models
import { Reservation, ListBlockedDates } from '../../models';

const updateReservation = {

  type: ReservationType,

  args: {
    reservationId: { type: new NonNull(IntType)},
    actionType: { type: new NonNull(StringType)},
  },

  async resolve({ request, response }, { reservationId, actionType }) {
    let isReservationUpdated = false;
    // Check if user already logged in
    if(request.user && !request.user.admin) {

        const userId = request.user.id;

        const updateReservation = await Reservation.update({
          reservationState: actionType
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

        if(actionType === 'declined'){
          const unlockBlockedDates = await ListBlockedDates.destroy({
            where: {
              reservationId
            }
          });
        }

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

export default updateReservation;

/**
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
**/ 
