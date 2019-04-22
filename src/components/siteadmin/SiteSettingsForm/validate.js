
const validate = values => {

  const errors = {}

  if (!values.siteName) {
    errors.siteName = 'Site name is required';
  }

  if (!values.siteTitle) {
    errors.siteTitle = 'Site title is required';
  }

  if (values.logoHeight) {
  	if(isNaN(values.logoHeight)){
  		errors.logoHeight = 'Logo height must be numeric value';
  	}
  }

  if (values.logoWidth) {
  	if(isNaN(values.logoWidth)){
  		errors.logoWidth = 'Logo width must be numeric value';
  	}
  }

  return errors
}

export default validate;
