import DateAvailabilityType from '../types/DateAvailabilityType';
import { ListBlockedDates } from '../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
} from 'graphql';

const DateAvailability = {

  type: DateAvailabilityType,

  args: {
    listId: { type: new NonNull(IntType) },
    startDate: { type: new NonNull(StringType) },
    endDate: { type: new NonNull(StringType) },
  },

  async resolve({ request, response }, { listId, startDate, endDate }) {

    const checkAvailableDates = await ListBlockedDates.findAll({
      where: { 
        listId,
        blockedDates: {
          $between: [startDate, endDate]
        }
       }
    });

    if(checkAvailableDates.length > 0){
      return {
        status: "NotAvailable"
      }
    } else {
      return {
        status: "Available"
      }
    }


  },
};

export default DateAvailability;
