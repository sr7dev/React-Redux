// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import {toastr} from 'react-redux-toastr';
import {setSiteSettings} from '../../../actions/siteSettings';

async function submit(values, dispatch) {

  const query = `
  query (
    $siteName: String,
    $siteTitle: String,
    $metaDescription: String,
    $logo: String,
    $facebookLink: String,
    $twitterLink: String,
    $instagramLink: String
    $logoHeight: Int,
    $logoWidth: Int,
  ) {
    updateSiteSettings (
      siteName: $siteName,
      siteTitle: $siteTitle,
      metaDescription: $metaDescription,
      logo: $logo,
      facebookLink: $facebookLink,
      twitterLink: $twitterLink,
      instagramLink: $instagramLink,
      logoHeight: $logoHeight,
      logoWidth: $logoWidth
    ) {
        status
    }
  }
  `;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: values
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if(data.updateSiteSettings.status === "success") {
    toastr.success("Update Settings", "Changes are updated!");
    dispatch(setSiteSettings());
  } else {
      toastr.error("Update Settings", "Updating Site Settings failed");
  }

}

export default submit;
