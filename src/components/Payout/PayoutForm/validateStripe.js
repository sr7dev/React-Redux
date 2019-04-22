import messages from '../../../locale/messages';

const validate = values => {

    const errors = {}

    if (!values.country) {
        errors.country = messages.payoutError1;
    }

    if (!values.city) {
        errors.city = messages.payoutError2;
    }

    if (!values.state) {
        errors.state = messages.payoutError3;
    }

    if (!values.zipcode) {
        errors.zipcode = messages.payoutError4;
    }

    if (!values.firstname) {
        errors.firstname = messages.payoutFirstNameRequired;
    }

    if (!values.lastname) {
        errors.lastname = messages.payoutLastNameRequired;
    }

    if (!values.routingNumber) {
        errors.routingNumber = messages.payoutRoutingRequired;
    } else if (isNaN(values.routingNumber) || (parseInt(values.routingNumber, 10) < 1)) {
        errors.routingNumber = messages.payoutRoutingInvalid;
    }

    if (!values.accountNumber) {
        errors.accountNumber = messages.accountNumberRequired;
    } else if (isNaN(values.accountNumber) || (parseInt(values.accountNumber, 10) < 1)) {
        errors.accountNumber = messages.accountNumberInvalid;
    }

    if (!values.confirmAccountNumber) {
        errors.confirmAccountNumber = messages.confirmAccountNumberRequired;
    } else if (isNaN(values.confirmAccountNumber) || (parseInt(values.confirmAccountNumber, 10) < 1)) {
        errors.confirmAccountNumber = messages.confirmAccountNumberInvalid;
    }

    if (values.confirmAccountNumber && values.accountNumber) {
        if (values.confirmAccountNumber !== values.accountNumber) {
            errors.confirmAccountNumber = messages.confirmAccountNumberMismatch;
        }
    }

    if (!values.ssn4Digits) {
        errors.ssn4Digits = messages.ssn4DigitsRequired;
    } else if (values.ssn4Digits) {
        if (isNaN(values.ssn4Digits) || (parseInt(values.ssn4Digits, 10) < 1)) {
            errors.ssn4Digits = messages.ssn4DigitsInvalid;
        }
    }

    return errors
}

export default validate;