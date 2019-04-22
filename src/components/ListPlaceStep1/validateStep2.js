import messages from '../../locale/messages';


const validateStep2 = values => {

  const errors = {}

  if (!values.title) {
    errors.title = messages.titleRequired;
  }

if (!values.description) {
  errors.description = messages.descriptionRequired;
}

  return errors
}

export default validateStep2
