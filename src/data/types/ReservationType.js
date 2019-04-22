import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType,
    GraphQLList as List,
} from 'graphql';

// Models
import { Listing, UserProfile, Threads, Payout, TransactionHistory, Transaction, CancellationDetails, User, ThreadItems } from '../models';

// Type
import ThreadsType from './ThreadsType';
import ShowListingType from './ShowListingType';
import ProfileType from './ProfileType';
import PayoutType from './PayoutType';
import TransactionHistoryType from './TransactionHistoryType';
import TransactionType from './TransactionType';
import CancellationDetailsType from './CancellationDetailsType';
import UserType from './UserType';
import ThreadItemsType from './ThreadItemsType';


const ReservationType = new ObjectType({
    name: 'Reservation',
    fields: {
        id: {
            type: IntType
        },
        listId: {
            type: IntType
        },
        listData: {
            type: ShowListingType,
            resolve(reservation) {
                return Listing.findOne({
                    where: { id: reservation.listId }
                })
            }
        },
        hostId: {
            type: StringType
        },
        hostPayout: {
            type: PayoutType,
            resolve(reservation) {
                if (reservation.payoutId != null && reservation.payoutId > 0) {
                    return Payout.findOne({
                        where: {
                            userId: reservation.hostId,
                            id: reservation.payoutId
                        }
                    })
                } else {
                    return Payout.findOne({
                        where: {
                            userId: reservation.hostId,
                            default: true
                        }
                    })
                }
            }
        },
        hostTransaction: {
            type: TransactionHistoryType,
            resolve(reservation) {
                return TransactionHistory.findOne({
                    where: {
                        reservationId: reservation.id,
                    }
                })
            }
        },
        hostData: {
            type: ProfileType,
            resolve(reservation) {
                return UserProfile.findOne({
                    where: { userId: reservation.hostId }
                });
            }
        },
        guestId: {
            type: StringType
        },
        guestData: {
            type: ProfileType,
            resolve(reservation) {
                return UserProfile.findOne({
                    where: { userId: reservation.guestId }
                })
            }
        },
        transaction: {
            type: TransactionType,
            resolve(reservation) {
                return Transaction.findOne({
                    where: { reservationId: reservation.id, paymentType: 'booking' }
                })
            }
        },
        refundStatus: {
            type: TransactionType,
            resolve(reservation) {
                return Transaction.findOne({
                    where: { reservationId: reservation.id, paymentType: 'cancellation' }
                })
            }
        },
        guestUser: {
            type: UserType,
            resolve(reservation) {
                return User.findOne({
                    where: { Id: reservation.guestId }
                })
            }
        },
        hostUser: {
            type: UserType,
            resolve(reservation) {
                return User.findOne({
                    where: { Id: reservation.hostId }
                })
            }
        },
        checkIn: {
            type: StringType
        },
        checkOut: {
            type: StringType
        },
        guests: {
            type: IntType
        },
        message: {
            type: StringType
        },
        basePrice: {
            type: FloatType
        },
        cleaningPrice: {
            type: FloatType
        },
        currency: {
            type: StringType
        },
        discount: {
            type: FloatType
        },
        discountType: {
            type: StringType
        },
        guestServiceFee: {
            type: FloatType,
        },
        hostServiceFee: {
            type: FloatType,
        },
        total: {
            type: FloatType,
        },
        confirmationCode: {
            type: IntType
        },
        reservationState: {
            type: StringType
        },
        paymentState: {
            type: StringType
        },
        payoutId: {
            type: IntType
        },
        messageData: {
            type: ThreadsType,
            resolve(reservation) {
                return Threads.findOne({
                    where: {
                        listId: reservation.listId,
                        $or: [
                            {
                                host: reservation.guestId
                            },
                            {
                                guest: reservation.guestId
                            }
                        ]
                    }
                });
            }
        },
        cancellationDetails: {
            type: CancellationDetailsType,
            resolve(reservation) {
                return CancellationDetails.findOne({
                    where: {
                        reservationId: reservation.id
                    }
                });
            }
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        count: {
            type: IntType
        },
        status: {
            type: StringType
        },
        paymentMethodId: {
            type: IntType
        },
        threadData: {
            type: ThreadItemsType,
            resolve(reservation) {
                return ThreadItems.findOne({
                    where: {
                        reservationId: reservation.id,
                    }
                });
            }
        },
    }
});

export default ReservationType;