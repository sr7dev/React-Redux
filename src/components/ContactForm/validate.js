import messages from '../../locale/messages';
 const validate = values => {

    const errors = {}

     if (!values.name) {
         errors.name = messages.nameRequired;
     } else if (values.name.trim() == "") {
         errors.name = messages.blankSpace;
     }

     if (!values.email) {
         errors.email = messages.emailRequired;
     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
         errors.email = messages.emailInvalid;
     }
    //   else if (values.email.trim() == "") {
    //      errors.email = messages.blankSpace;
    //  }

     if (!values.phoneNumber) {
         errors.phoneNumber = messages.phoneNumberRequired;
     } else if (values.phoneNumber.trim() == "") {
         errors.phoneNumber = messages.blankSpace;
     }
    
     if (!values.ContactMessage) {
         errors.ContactMessage = messages.contacthostError2;
     } else if (values.ContactMessage.trim() == "") {
         errors.ContactMessage = messages.blankSpace;
     }

     if (!values.reCaptcha){
         errors.reCaptcha = messages.recaptchaRequired;
     }
     return errors
}
export default validate
