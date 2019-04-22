import AllReservationType from '../../types/AllReservationType';
import {Reservation} from '../../models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType
} from 'graphql';

const getAllReservation = {

    type:  AllReservationType,

    args: {
        userType: { type: StringType },
        currentPage: { type: IntType },
        dateFilter: { type: StringType }
    },

    async resolve({request}, {userType, currentPage, dateFilter}) {
        const limit = 5;
        let offset = 0;
        // Offset from Current Page
        if(currentPage){
          offset = (currentPage - 1) * limit;
        }
        if(request.user && !request.user.admin) {
            const userId = request.user.id;
            let where;
            let paymentState = 'completed';
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            let tripFilter = {
                $gte: today
            };

            if (dateFilter == 'previous') {
                tripFilter = {
                    $lt: today
                }
            }

            if(userType === 'host'){
                where = {
                    hostId: userId,
                    paymentState,
                    checkIn: tripFilter
                };
            } else {
                where = {
                    guestId: userId,
                    paymentState,
                    checkIn: tripFilter
                };
            }

            const count = await Reservation.count({ where });
            const reservationData = await Reservation.findAll({
              where,
              order: [['checkIn', 'DESC']],
              limit: limit,
              offset: offset, 
            }); 

            return {
              reservationData,
              count
            };
            
        } else {
            return {
              status: "notLoggedIn",
            };
        }
    }
};

export default getAllReservation;

/**

query getAllReservation ($userType: String){
  getAllReservation(userType: $userType){
    id
    listId
    checkIn
    checkOut
    guestServiceFee
    hostServiceFee
    reservationState
        total
    message {
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
  }
}

**/