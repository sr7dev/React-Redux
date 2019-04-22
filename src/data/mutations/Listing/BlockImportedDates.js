import ListBlockedDatesType from '../../types/ListBlockedDatesType';

import { ListBlockedDates, Listing } from '../../models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const blockImportedDates = {

    type: ListBlockedDatesType,

    args: {
        calendarId: { type: new NonNull(IntType) },
        listId: { type: new NonNull(IntType) },
        blockedDates: { type: new List(StringType) },
    },

    async resolve({ request }, { calendarId, listId, blockedDates }) {

        // Check whether user is logged in
        if (request.user || request.user.admin) {
            var blockedDatesCollection = [];
            var reservationDatesCollection = [];
            let where = { id: listId };
            if (!request.user.admin) {
                where = {
                    id: listId,
                    userId: request.user.id
                };
            }
            // Remove Existing Imported Blocked Dates
            const isListingAvailable = await Listing.find({ where });

            if (isListingAvailable) {
                if (calendarId) {
                    await ListBlockedDates.destroy({
                        where: {
                            listId,
                            calendarId
                        }
                    });
                }

                if (blockedDates && blockedDates.length > 0) {

                    // Collect rest of the blocked dates for that list                
                    const reservationDates = await ListBlockedDates.findAll({
                        where: {
                            listId
                        }
                    });

                    // Prepare for reservation blocked dates
                    if (reservationDates && reservationDates.length > 0) {
                        reservationDates.map((item) => {
                            reservationDatesCollection.push(item.blockedDates);
                        })
                    }

                    //console.log('reservation dates', reservationDatesCollection );
                    /*var uniqueBlockedDates = blockedDates.filter(function(elem, index, self) {
                        return index == self.indexOf(elem);
                    });*/

                    // Prepare for bulk imported blocked dates
                    blockedDates.map(async (item) => {
                        let checkDate = reservationDatesCollection.indexOf(item);
                        if (checkDate === -1) {
                            let blockedDatesInstance = {
                                listId,
                                calendarId,
                                blockedDates: item
                            };
                            blockedDatesCollection.push(blockedDatesInstance);
                        }
                        /*let blockedDatesInstance = {
                            listId,
                            calendarId,
                            blockedDates: item
                        };
                        blockedDatesCollection.push(blockedDatesInstance);*/
                    });

                    // Do the bulk insert for the imported blocked dates
                    const bulkCreate = await ListBlockedDates.bulkCreate(blockedDatesCollection);

                    if (bulkCreate) {
                        return {
                            status: '200'
                        };
                    }

                } else {
                    return {
                        status: '200'
                    };
                }
            } else {
                return {
                    status: '404'
                };
            }



        } else {
            return {
                status: '403'
            };
        }
    },
};

export default blockImportedDates;


/**
mutation BlockImportedDates($listId: Int!, $calendarId: Int!, $blockedDates: [String]) {
    blockImportedDates(listId: $listId, calendarId: $calendarId, blockedDates: $blockedDates) {
        status
    }
}
 */
