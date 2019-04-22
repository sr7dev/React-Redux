import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.name) {
    errors.name = messages.nameRequired;
  }

  return errors
}

export default validate
