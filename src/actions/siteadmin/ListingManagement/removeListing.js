import {gql} from 'react-apollo';
// Toaster
import {toastr} from 'react-redux-toastr';
import getAllListingsQuery from './getAllListing.graphql';
import {
  SITE_ADMIN_REMOVE_LISTING_START,
  SITE_ADMIN_REMOVE_LISTING_SUCCESS,
  SITE_ADMIN_REMOVE_LISTING_ERROR 
} from '../../../constants';

export function removeListing( listId, userRole ) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SITE_ADMIN_REMOVE_LISTING_START,
    });

    try {

      const mutation = gql`
        mutation adminRemoveListing($listId:Int!) {
          adminRemoveListing (listId:$listId) {
            status
            id
            name
          }
        }
      `;
      // Send Request to get listing data
      const {data} = await client.mutate({
        mutation,
        variables: {listId},
        refetchQueries: [{ query: getAllListingsQuery }]
      });
     
      if(data && data.adminRemoveListing){
        dispatch({
          type: SITE_ADMIN_REMOVE_LISTING_SUCCESS,
        });
        toastr.success("Success!", "List is removed successfully");
        
        if(data.adminRemoveListing.length > 0){
          const removeFiles = await fetch('/removeMultiFiles', {
              method: 'post',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  files: data.adminRemoveListing,
              }),
              credentials: 'include',
          });
        }
      } else {
        dispatch({
          type: SITE_ADMIN_REMOVE_LISTING_ERROR,
        });
      }
    } catch (error) {
        dispatch({
          type: SITE_ADMIN_REMOVE_LISTING_ERROR,
          payload:{
            error
          }
        });
      return false;
    }

    return true;
  };
}
