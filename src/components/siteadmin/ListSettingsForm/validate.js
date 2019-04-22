import messages from './messages';

const validate = values => {

  const errors = {}

  if (!values.itemName) {
    errors.itemName = messages.itemNameIsRequired;
  }

  if (!values.otherItemName) {
    errors.otherItemName = messages.otherItemNameIsRequired;
  }

  if (values.startValue != 0 && values.startValue < 0) {
    if(Number(values.startValue) || Number(values.startValue) != parseInt(values.startValue, 10)) {
      errors.startValue = messages.startValueIsInvalid;
    }
  }

  if (!Number(values.endValue) || Number(values.endValue) != parseInt(values.endValue, 10) ) {
    errors.endValue = messages.endValueIsInvalid;
  }

  if(Number(values.endValue) < Number(values.startValue)) {
    errors.endValue = messages.endValueGreater;
  }

  return errors
}

export default validate
