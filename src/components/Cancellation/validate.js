import messages from '../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.message) {
    errors.message = messages.contacthostError2;
  }

  return errors;
}

export default validate;