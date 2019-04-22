import ListPhotosType from '../../types/ListPhotosType';
import { Listing, ListPhotos } from '../../models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
} from 'graphql';

const RemoveListPhotos = {

  type:  ListPhotosType,

  args: {
    listId: { type: new NonNull(IntType) },
    name: { type: StringType },
  },

  async resolve({ request, response }, { listId, name }) {

    // Check whether user is logged in
    if (request.user || request.user.admin) {

      let where = { id: listId };
      if (!request.user.admin) {
        where = {
          id: listId,
          userId: request.user.id
        }
      };

      // Check whether listing is available
      const isListingAvailable = await Listing.findOne({ where });

      if(isListingAvailable) {

        // Create a new record for a photo
        const removePhoto = await ListPhotos.destroy({
          where: {
            listId: listId,
            name: name,
          }
        });

        const photosCount = await ListPhotos.count({ where: { listId } });

        if (photosCount < 1) {
          const updateListingStatus = await Listing.update({
            isPublished: false,
            isReady: false
          }, {
            where: { id: listId }
          });
        }

        return {
          status: "success",
          photosCount: photosCount
        };

      } else {
          return {
            status: "Listing is not available"
          };
      }

    } else {
        return {
          status: "Not loggedIn"
        };
    }

  },
};

export default RemoveListPhotos;

/*
mutation ($userId:String!, $documentId:Int) {
  RemoveDocumentList (userId:$userId, documentId: $documentId) {
    status
    photosCount
  }
}*/
