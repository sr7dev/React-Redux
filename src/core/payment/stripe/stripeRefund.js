import stripePackage from 'stripe';
import { payment } from '../../../config';
const stripe = stripePackage(payment.stripe.secretKey);
import { createTransaction } from './helpers/createTransaction';

const stripeRefund = app => {
    app.post('/stripe-refund', async function (req, res) {
        const reservationDetails = req.body.reservationDetails;
        let charge, amount, reservationId, currency;
        let status = 200, errorMessage, refund;
        if (reservationDetails) {
            charge = reservationDetails.transactionId;
            amount = reservationDetails.amount;
            currency = reservationDetails.currency;
            reservationId = reservationDetails.reservationId;
        } else {
            status = 400;
            errorMessage = 'Something Went Wrong, please try again';
        }

        if(status === 200 && amount && charge) {
            try {
                refund = await stripe.refunds.create({
                    charge,
                    amount: Math.round(amount * 100),
                });
            } catch (error) {
                status = 400;
                errorMessage = error.message;
            }
        }

        if (status === 200 && refund && 'id' in refund) {
           // Update Transactions
            await createTransaction(
                reservationDetails.reservationId,
                null,
                null,
                refund.id,
                Math.round(reservationDetails.amount),
                reservationDetails.currency,
                'cancellation',
                2
            );
        }
        console.log('refund', refund);
        res.send({ status, errorMessage });
    });
};

export default stripeRefund;