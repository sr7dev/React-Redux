import messages from '../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.firstName) {
    errors.firstName = messages.firstNameRequired;
  } else if (values.firstName && values.firstName.trim() == "") {
    errors.firstName = messages.blankSpace;
  }

  if (!values.lastName) {
    errors.lastName = messages.lastNameRequired;
  } else if (values.lastName && values.lastName.trim() == "") {
    errors.lastName = messages.blankSpace;
  }

  if (!values.email) {
    errors.email = messages.emailRequired;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = messages.emailInvalid;
  }

  if (!values.gender) {
    errors.gender = messages.genderRequired;
  }

  /*if (!values.phoneNumber) {
    errors.phoneNumber = messages.phoneNumberRequired;
  } else if (values.phoneNumber && values.phoneNumber.trim() == "") {
    errors.phoneNumber = messages.blankSpace;
  }*/


  if (!values.preferredLanguage) {
    errors.preferredLanguage = messages.preferredLanguageRequired;
  }

  if (!values.preferredCurrency) {
    errors.preferredCurrency = messages.preferredCurrencyRequired;
  }

  if (!values.location) {
    errors.location = messages.locationRequired;
  } else if (values.location && values.location.trim() == "") {
    errors.location = messages.blankSpace;
  }

  if (!values.info) {
    errors.info = messages.infoRequired;
  } else if (values.info && values.info.trim() == "") {
    errors.info = messages.blankSpace;
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = messages.dateOfBirthRequired;
  }

  return errors
}

export default validate
