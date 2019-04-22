import messages from '../../../locale/messages';
const validate = values => {

  const errors = {}

  if (!values.personCapacity) {
    errors.personCapacity = messages.contacthostError1;
  }

  if (!values.content) {
    errors.content = messages.contacthostError2;
  }
  
  return errors
}

export default validate
