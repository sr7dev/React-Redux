const validate = values => {

  const errors = {}

  if (!values.message) {
    errors.message = 'Message is required';
  }

  if (!values.paymentCurrency) {
    errors.paymentCurrency = 'Choose a payment currency';
  }

  return errors;
}

export default validate;