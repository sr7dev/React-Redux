import messages from '../../../locale/messages';

const validate = values => {

    const errors = {};

    if (!values.reviewContent) {
        errors.reviewContent = messages.reviewError1;
    }

    if (!values.rating) {
        errors.rating = messages.reviewError2;
    }

    return errors;
};

export default validate;
