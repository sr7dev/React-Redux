import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.content) {
    errors.content = messages.contacthostError2;
  }

  return errors;
}

export default validate;