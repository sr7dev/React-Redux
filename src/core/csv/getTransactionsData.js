import { TransactionHistory, Reservation } from '../../data/models';
import sequelize from '../../data/sequelize';

export async function completedTransactions(userId) {
    let dataItems = [];
    const data = await TransactionHistory.findAll({
        where: {
            userId
        }
    });
    if (data && data.length > 0) {
        data.map((item) => {
            let dataItem = {};
            dataItem = {
                'Date': item.createdAt,
                'Type': 'Payout',
                'ReservationId': item.reservationId,
                'PayoutEmail': item.payoutEmail,
                'Amount': item.amount,
                'Currency': item.currency
            };
            dataItems.push(dataItem);
        })
    }
    return dataItems;
}

export async function futureTransactions(hostId) {
    let dataItems = [];
    const data = await Reservation.findAll({
        where: {
            hostId,
            paymentState: 'completed',
            $or: [
                {
                    reservationState: 'approved'
                },
                {
                    reservationState: 'completed'
                }
            ],
            id: {
                $notIn: [
                    sequelize.literal("SELECT reservationId FROM TransactionHistory")
                ]
            }
        }
    });
    if (data && data.length > 0) {
        data.map((item) => {
            let dataItem = {};
            dataItem = {
                'Estimated Date': item.checkOut,
                'Type': 'Reservation',
                'ReservationId': item.id,
                'Estimated Amount': (Number(item.total) - Number(item.hostServiceFee)),
                'Currency': item.currency
            };
            dataItems.push(dataItem);
        })
    }
    return dataItems;
}

export async function grossEarnings(hostId) {
    let dataItems = [];
    const data = await Reservation.findAll({
        where: {
            hostId,
            paymentState: 'completed',
            reservationState: 'completed'
        },
        include: [
            {
                model: TransactionHistory,
                as: 'transactionHistory',
                required: true,
                where: {
                    userId: hostId
                }
            }
        ]
    });

    if (data && data.length > 0) {
        data.map((item) => {
            //console.log('item from gross earnings', item.transactionHistory.createdAt);
            let dataItem = {};
            dataItem = {
                'Date': item.transactionHistory[0].createdAt,
                'Type': 'Gross Earnings',
                'ReservationId': item.id,
                'Amount with Host Service Fee': Number(item.total + item.hostServiceFee),
                'Currency': item.currency
            };
            dataItems.push(dataItem);
        })
    }
    return dataItems;
}