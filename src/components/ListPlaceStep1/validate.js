import messages from '../../locale/messages';


const validate = values => {

  const errors = {}

  if (!values.houseType) {
    errors.houseType = messages.houseTypeRequired;
  }

  if (!values.country) {
    errors.country = messages.countryRequired;
  }

  if (!values.state) {
    errors.state = messages.stateRequired;
  }

  if (!values.city) {
    errors.city = messages.cityRequired;
  }

  if (!values.street) {
    errors.street = messages.streetRequired;
  }

  if (!values.zipcode) {
    errors.zipcode = messages.zipcodeRequired;
  }

  return errors
}

export default validate
