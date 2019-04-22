import {makePayment} from '../../../actions/booking/makePayment';

async function submit(values, dispatch) {

  let paymentType = values.paymentType;
  let name = values.paymentType == 2 ? values.name : null;
  let cardNumber = values.paymentType == 2 ? values.cardNumber : null;
  let cvv = values.paymentType == 2 ? values.cvv : null;
  let expiryDate = values.paymentType == 2 ? values.expiryDate : null;
  let expiryYear = values.paymentType == 2 ? values.expiryYear : null;
  let paymentCurrency = values.paymentType == 1 ? values.paymentCurrency : null;

  dispatch(makePayment(
    	values.listId,
      values.listTitle, 
    	values.hostId, 
    	values.guestId, 
    	values.checkIn, 
    	values.checkOut, 
    	values.guests, 
      values.message,
    	values.basePrice, 
    	values.cleaningPrice, 
    	values.currency,
      values.discount,
      values.discountType,
      values.guestServiceFee,
      values.hostServiceFee,
      values.total,
      values.bookingType,
      paymentCurrency,
      paymentType,
      name,
      cardNumber,
      cvv,
      expiryDate,
      expiryYear,
      values.guestEmail
  	)
  );
  //dispatch(reset('PaymentForm'));
}

export default submit;
