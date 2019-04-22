// Query Type
import ShowListingType from '../../types/ShowListingType';

// For sequelize functions
import sequelize from '../../sequelize';


// Database models
import { Listing } from '../../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const getAllListings = {

  type: new List(ShowListingType),

  async resolve({ request }) {

    if(request.user && request.user.admin == true) {

      const getListings = await Listing.findAll({
        /*where: {
          isPublished: true
        }*/
      });
      return getListings;
      
     } else {
         return {
           status: 'failed'
         }
     }
  },
};

export default getAllListings;