import paypal from 'paypal-rest-sdk';
import { payment as config } from '../../../config';
import {createTransactionHistory} from './createTransactionHistory';

const payoutRoutes = app => {

  var paymentConfig = {
    "api" : {
      "host" : config.paypal.host,
      "port" : '',            
      "client_id" : config.paypal.clientId,  // your paypal application client id
      "client_secret" : config.paypal.secret // your paypal application secret id
    }
  }
 
  paypal.configure(paymentConfig.api);

  app.post('/payout', async function(req, res) {
    // paypal payment configuration.

    var sender_batch_id = Math.random().toString(36).substring(9);
    var reservationId = req.body.reservationId;
    var hostEmail = req.body.hostEmail;
    var payoutId = req.body.payoutId;
    var amount = req.body.amount;
    var currency = req.body.currency;  
    var userId = req.body.userId;  
    var paymentMethodId = req.body.paymentMethodId;

    var create_payout_json = {
        "sender_batch_header": {
            "sender_batch_id": sender_batch_id,
            "email_subject": "You have a payment"
        },
        "items": [
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": amount,
                    "currency": currency
                },
                "receiver": hostEmail,
                "note": "Thank you.",
                "sender_item_id": reservationId
            }
        ]
    };

    var sync_mode = 'true';

    paypal.payout.create(create_payout_json, sync_mode, async function (error, payout) {
      if (error) {
          console.log(error.response);
          res.send({status: error.response});
          throw error;
      } else {
          var batchId = payout.batch_header.payout_batch_id;
          var batchStatus = payout.batch_header.batch_status;
          var fees = payout.batch_header.fees.value;
          /*paypal.payout.get(payoutId, function (error, payoutData) {
              if (error) {
                  console.log(error);
                  throw error;
              } else {
                  console.log("Get Payout Response");
                  console.log(JSON.stringify(payoutData));
              }
          });*/ 
          if(batchStatus && batchStatus === 'SUCCESS'){
            await createTransactionHistory(
              reservationId, 
              hostEmail, 
              payoutId, 
              amount, 
              fees,
              currency,
              userId,
              paymentMethodId
            );
            res.send({status: batchStatus});
          } else {
            res.send({status: batchStatus});
          }
      }
    }); 

  });

};

export default payoutRoutes;