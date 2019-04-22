import {gql} from 'react-apollo';
import {toastr} from 'react-redux-toastr';

import fetch from '../core/fetch';
import {
  CREATE_LIST_PHOTOS_START,
  CREATE_LIST_PHOTOS_SUCCESS,
  CREATE_LIST_PHOTOS_ERROR,
  REMOVE_LIST_PHOTOS_START,
  REMOVE_LIST_PHOTOS_SUCCESS,
  REMOVE_LIST_PHOTOS_ERROR 
} from '../constants';
import {getListPhotos} from './getListPhotos';

export function createListPhotos( listId, name, type ) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: CREATE_LIST_PHOTOS_START,
    });

    try {

      let mutation = gql`
        mutation UploadListPhotos ($listId:Int!, $name: String, $type: String) {
          CreateListPhotos (listId:$listId, name: $name, type: $type) {
            status
            photosCount
          }
        } 
      `;
      // Send Request to create a record for a listing
      const {data} = await client.mutate({
        mutation,
        variables: {listId, name, type},
      });

      if (data && data.CreateListPhotos && data.CreateListPhotos.status === 'success') {
        dispatch(getListPhotos(listId));
        dispatch({
          type: CREATE_LIST_PHOTOS_SUCCESS,
          photosCount: data.CreateListPhotos.photosCount
        });
        toastr.success('Success!', 'Your list photo is uploaded successfully!');
      }

    } catch (error) {
        dispatch({
          type: CREATE_LIST_PHOTOS_ERROR,
        });
      return false;
    }

    return true;
  };
}


export function removeListPhotos( listId, name, reload ) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: REMOVE_LIST_PHOTOS_START,
    });

    try {

      let mutation = gql`
        mutation RemoveListPhotos($listId:Int!, $name:String) {
          RemoveListPhotos (listId:$listId, name: $name) {
            status
            photosCount
          }
        }
      `;

      const {data} = await client.mutate({
        mutation,
        variables: {listId, name},
      });

      if (data && data.RemoveListPhotos && data.RemoveListPhotos.status === 'success') {
        dispatch({
          type: REMOVE_LIST_PHOTOS_SUCCESS,
          photosCount: data.RemoveListPhotos.photosCount
        });
        dispatch(getListPhotos(listId));

        // Remove file physically
        const resp = await fetch('/deletePhotos', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileName: name }),
          credentials: 'include',
        });
        const { status } = await resp.json();
      }
      
    } catch (error) {
        dispatch({
          type: REMOVE_LIST_PHOTOS_ERROR,
          payload:{
            error
          }
        });
      return false;
    }

    return true;
  };
}
