import messages from './messages';

const validate = values => {

  const errors = {}

  if (!values.firstName) {
    errors.firstName = 'First name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last name is Required';
  }

  if (!values.gender) {
    errors.gender = 'Gender is Required';
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone Number is Required';
  }

  if (!values.preferredLanguage) {
    errors.preferredLanguage = 'Preferred Language is Required';
  }

  if (!values.preferredCurrency) {
    errors.preferredCurrency = 'Preferred Currency is Required';
  }

  if (!values.location) {
    errors.location = 'Location is required';
  }

  if (!values.info) {
    errors.info = 'Describe Yourself is Required';
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Birthday is required';
  }

  return errors
}

export default validate
