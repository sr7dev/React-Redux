import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.country) {
    errors.country = messages.payoutError1;
  }

  if (!values.city) {
    errors.city = messages.payoutError2;
  }

  if (!values.state) {
    errors.state = messages.payoutError3;
  }

  if (!values.zipcode) {
    errors.zipcode = messages.payoutError4;
  }

  if (!values.payEmail) {
    errors.payEmail = messages.emailRequired;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.payEmail)) {
    errors.payEmail = messages.payoutError5;
  }

  if (!values.currency) {
    errors.currency = messages.payoutError6;
  }

  return errors
}

export default validate;