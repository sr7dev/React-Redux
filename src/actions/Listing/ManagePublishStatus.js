import {gql} from 'react-apollo';
// Toaster
import {toastr} from 'react-redux-toastr';

import {
    MANANGE_LISTING_PUBLISH_STATUS_START,
    MANANGE_LISTING_PUBLISH_STATUS_SUCCESS,
    MANANGE_LISTING_PUBLISH_STATUS_ERROR,
} from '../../constants';

// To Refresh the Manage Listing Status
const ManageListingQuery = gql ` 
    query ManageListings{
        ManageListings {
            id
            title
            city
            updatedAt
            coverPhoto
            isPublished
            isReady
            listPhotos{
                id
                name
            }
            settingsData {
                listsettings {
                    id
                    itemName
                }
            }
            listingSteps {
                id
                step1
                step2
                step3
            }
        }
  }`;

// To Refresh Listing Steps Query
const ListingStepsQuery = gql `
    query ($listId:String!) {
        showListingSteps (listId:$listId) {
            id
            listId
            step1
            step2
            step3
            listing {
                id
                isReady
                isPublished
            }
        }
    }`;

export function ManagePublishStatus(listId, action) {

    return async(dispatch, getState, {client}) => {

        dispatch({type: MANANGE_LISTING_PUBLISH_STATUS_START});

        let mutation = gql `
            mutation ManagePublish($listId: Int!, $action: String!) {
                managePublish(listId: $listId, action: $action) {
                    status
                }
            }
        `;

        try {

            let type = 'Publish Listing';
            if(action === 'unPublish') {
                type = 'UnPublish Listing'
            }

            const {data} = await client.mutate({
                mutation,
                variables: {
                    listId,
                    action
                },
                refetchQueries: [
                    { query: ManageListingQuery },
                ]
            });

            if (data.managePublish.status === '200') {
                // Reload Existing Steps Page
                const {data} = await client.query({
                    query: ListingStepsQuery,
                    variables: { listId },
                    fetchPolicy: 'network-only',
                });
                toastr.success(type, type + " is success!");
                dispatch({
                    type: MANANGE_LISTING_PUBLISH_STATUS_SUCCESS,
                    payload: {
                        listingSteps: data.showListingSteps,
                    }
                });
            } else {
                
                toastr.error(type, type + " is failed!");
                dispatch({
                    type: MANANGE_LISTING_PUBLISH_STATUS_ERROR, 
                    payload: {
                        status: data.managePublish.status
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: MANANGE_LISTING_PUBLISH_STATUS_ERROR, 
                payload: {
                    error
                }
            });
        }
    };
}
